import axios from "axios";
import { shuffle } from "../../helpers/randomUtils";
import { keyExists, load, save } from "../../helpers/localStorageManager";

const api = "https://pokeapi.co/api/v2/";
const pokeSpecies = "pokemon-species/";
const pokemon = "pokemon/";

const genNameMap = {
  "generation-i": "Gen 1",
  "generation-ii": "Gen 2",
  "generation-iii": "Gen 3",
  "generation-iv": "Gen 4",
  "generation-v": "Gen 5",
  "generation-vi": "Gen 6",
  "generation-vii": "Gen 7",
  "generation-viii": "Gen 8",
  "generation-ix": "Gen 9",
};

const unescape = (str) => str.replace("\n", " ").replace("\f", " ");

const cleanEntry = (flavorTextEntries, name = "") => {
  const regex = new RegExp(name, "gi");
  const replacedFTE = flavorTextEntries.replace(regex, name[0].toUpperCase() + "***");
  return replacedFTE.toString();
};

// Inorder traversal of species tree
const getRestOfFamilyTree = (chain) => {
  if (!chain) return [];
  const tempTree = [chain.species.name];
  chain.evolves_to.forEach(children => {
    tempTree.push(...getRestOfFamilyTree(children));
  });
  return tempTree;
};

export const submitAnswer = (ans, usedHint = false) => {
  return (dispatch, getState) => {
    const { answer, score, familyTree } = getState();
    const realAnswer = answer.toLowerCase().replace("-", " ").replace(".", " ");
    const userAnswered = ans.toLowerCase();
    let action = {
      type: "SUBMIT_ANSWER",
      payload: {
        modalInfo: {
          message: "",
          color: ""
        },
        score,
      }
    };
    let newScore = action.payload.score;
    if (realAnswer === userAnswered.replace("-", " ").replace(".", " ")) {
      action.payload.modalInfo.message = "Answer is correct!";
      action.payload.modalInfo.color = "green";
      newScore = action.payload.score + 5 - (usedHint ? 2 : 0);
    } else if (familyTree.includes(userAnswered)) {
      action.payload.modalInfo.message = "Partial answer!";
      action.payload.modalInfo.color = "amber";
      newScore = action.payload.score + 4 - (usedHint ? 2 : 0);
    }
    else {
      action.payload.modalInfo.message = "Answer is incorrect!";
      action.payload.modalInfo.color = "red";
      newScore = action.payload.score + 3 - (usedHint ? 2 : 0);
    }
    action.payload.score = newScore;
    dispatch(action);
  };
};

export const getPoke = () => {
  return async (dispatch, getState) => {
    const { alreadyAnswered, question } = getState();
    let aa = [...alreadyAnswered];
    if (aa.length === 0) {
      /** Literally from 1 to 807 because PokeAPI hasn't added SwSh stuff **/
      for (let x = 0; x < 808; x++) {
        aa.push(x);
      }
      aa = shuffle(aa);
    }
    const randomPoke = aa.shift();
    const pokemonSpeciesUrl = api + pokeSpecies + randomPoke;

    let responses = {
      "pokemon-species": {},
      "evolution-chain": {}
    };

    try {
      if (keyExists(randomPoke)) {
        responses = load(randomPoke);
      } else {
        const { id, name, color, generation, flavor_text_entries, evolution_chain } = (await axios.get(pokemonSpeciesUrl)).data;
        console.log(name, evolution_chain, id);
        const { chain } = (await axios.get(evolution_chain.url)).data;
        responses["pokemon-species"] = { id, name, color, generation, flavor_text: unescape(flavor_text_entries.find(e => e.language.name === "en").flavor_text), evolution_chain };
        responses["evolution-chain"] = getRestOfFamilyTree(chain).filter(e => e.toLowerCase() !== name).map(e => e);
        save(randomPoke, responses);
      }
    } catch (ex) {
      dispatch({
        type: "GET_POKE_ERROR",
        error: ex
      });
      return;
    }
    console.log(responses["pokemon-species"])

    const newQuestionValue = question + 1;
    const { flavor_text, generation, color, id } = responses["pokemon-species"];
    const name = responses["pokemon-species"].name.toLowerCase();
    const familyTree = responses["evolution-chain"];
    const entry = cleanEntry(flavor_text, name);
    const hintText = `It is a Pokemon from ${genNameMap[generation.name]}, colored ${color.name}`;

    dispatch({
      type: "GET_POKE",
      payload: {
        answer: name,
        alreadyAnswered: aa,
        natural: flavor_text,
        familyTree,
        entry,
        newQuestionValue,
        hintText,
        id
      }
    });
  };
};

export const openModal = () => {
  return async (dispatch, getState) => {
    const currentState = getState();
    const url = api + pokemon + currentState.id;
    const shinyEncounter = Math.abs(Math.random() - 1.0 / 1365.33) < 0.1;
    return axios
      .get(url)
      .then(res => {
        var poke = res.data;
        var action = {
          type: "OPEN_MODAL",
          payload: {
            pokeName: currentState.answer,
            pokeDesc: currentState.natural,
            pokeSpriteUrl: shinyEncounter
              ? poke.sprites.front_shiny
              : poke.sprites.front_default
          }
        };
        dispatch(action);
      })
      .catch(error => dispatch({ type: "OPEN_MODAL_ERROR", err: error }));
  };
};

export const closeModal = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "CLOSE_MODAL"
    });
  };
};

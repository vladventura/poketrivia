import axios from "axios";
import { shuffle } from "../../helpers/randomUtils";

const api = "https://pokeapi.co/api/v2/";
const pokeSpecies = "pokemon-species/";
const pokemon = "pokemon/";

const unescape = (str) => str.replace("\n", " ").replace("\f", " ");

const cleanEntry = (flavorTextEntries, name) => {

  const ame = name.substr(1);
  const regex = new RegExp(ame, "gi");
  const replacedFTE = flavorTextEntries.replace(regex, "*** ");
  return replacedFTE.toString();
};

export const submitAnswer = (answer, usedHint = false) => {
  return (dispatch, getState) => {
    const currentState = getState();
    let action = {
      type: "SUBMIT_ANSWER",
      payload: {
        modalInfo: {
          message: "",
          color: ""
        },
        score: currentState.score,
      }
    };
    let newScore = action.payload.score;
    if (currentState.answer === answer.toLowerCase()) {
      action.payload.modalInfo.message = "Answer is correct!";
      action.payload.modalInfo.color = "green";
      newScore = action.payload.score + 5 - (usedHint? 2 :0);
    } else {
      action.payload.modalInfo.message = "Answer is incorrect!";
      action.payload.modalInfo.color = "red";
      newScore = action.payload.score + 3 - (usedHint? 0 : 2);
    }
    action.payload.score = newScore;
    dispatch(action);
  };
};

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

export const useHint = () => {
  return (dispatch, getState) => {
    
  }
}

export const getPoke = () => {
  return async (dispatch, getState) => {
    const { alreadyAnswered } = getState();
    let aa = [...alreadyAnswered];
    if (aa.length === 0) {
      /** Literally from 1 to 807 because PokeAPI hasn't added SwSh stuff **/
      for (let x = 0; x < 808; x++) {
        aa.push(x);
      }
      aa = shuffle(aa);
    }
    let randomPoke = aa.shift();
    const url = api + pokeSpecies + randomPoke;
    return axios
      .get(url)
      .then(response => {
        let state = getState();
        let question = state.question + 1;
        const { name, flavor_text_entries, generation, color, id } = response.data;
        console.log(response.data);
        const natural = unescape(flavor_text_entries.find(e => e.language.name === "en").flavor_text);
        const entry = cleanEntry(natural, name);
        const hintText = `It is a Pokemon from ${genNameMap[generation.name]}, colored ${color.name}`;

        dispatch({
          type: "GET_POKE",
          payload: {
            answer: name,
            alreadyAnswered: aa,
            natural,
            entry,
            question,
            hintText,
            id
          }
        });
      })
      .catch(error => {
        dispatch({
          type: "GET_POKE_ERROR",
          error
        });
      });
  };
};

export const openModal = () => {
  return (dispatch, getState) => {
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

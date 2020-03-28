import axios from "axios";

const api = "https://pokeapi.co/api/v2/";
const pokeSpecies = "pokemon-species/";
const pokemon = "pokemon/";

export const submitAnswer = answer => {
  return (dispatch, getState) => {
    const currentState = getState();
    var action = {
      type: "",
      payload: {
        message: "",
        color: ""
      }
    };
    if (currentState.answer === answer.toLowerCase()) {
      action.type = "ANSWER_CORRECT";
      action.payload.message = "Answer is correct!";
      action.payload.color = "green";
    } else {
      action.type = "ANSWER_INCORRECT";
      action.payload.message = "Answer is incorrect!";
      action.payload.color = "red";
    }
    console.log("Action is ", action);
    dispatch(action);
  };
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

/** Literally from 1 to 807 because PokeAPI hasn't added SwSh stuff **/

export const getPoke = () => {
  const randomPoke = getRandomIntInclusive(1, 807);
  return (dispatch, getState) => {
    const url = api + pokeSpecies + randomPoke;
    return axios
      .get(url)
      .then(response => {
        dispatch({
          type: "GET_POKE",
          payload: response.data
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
    const url = api + pokemon + currentState.answer;

    return axios
      .get(url)
      .then(res => {
        var poke = res.data;
        var action = {
          type: "OPEN_MODAL",
          payload: {
            pokeName: currentState.answer,
            pokeDesc: currentState.natural,
            pokeSpriteUrl:
              Math.random() === 1.0 / 1365.33
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

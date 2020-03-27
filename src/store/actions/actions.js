import axios from "axios";

const api = "https://pokeapi.co/api/v2/";
const pokeSpecies = "pokemon-species/";

export const submitAnswer = answer => {
  return (dispatch, getState) => {
    const currentState = getState();
    var action;
    if (currentState.answer === answer.toLowerCase()) {
      action = {
        type: "ANSWER_CORRECT"
      };
    } else {
      action = {
        type: "ANSWER_INCORRECT"
      };
    }
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

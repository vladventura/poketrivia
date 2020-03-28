var initState = {
  entry: "",
  answer: "",
  score: 0,
  question: 0,
  modal: {}
};
const cleanEntry = (flavorTextEntries, name) => {
  const ame = name.substr(1);
  const regex = new RegExp(ame, "g");
  const replacedFTE = flavorTextEntries.replace(regex, "____ ");
  return replacedFTE;
};
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "ANSWER_CORRECT":
      const score = state.score + 1;
      return {
        ...state,
        modal: {
          message: action.payload.message,
          color: action.payload.color
        },
        score
      };
    case "ANSWER_INCORRECT":
      return {
        ...state,
        modal: {
          message: action.payload.message,
          color: action.payload.color
        }
      };
    case "GET_POKE":
      var question = state.question + 1;
      const { name } = action.payload;
      const entry = cleanEntry(
        action.payload.flavor_text_entries.find(entry => {
          return entry.language.name === "en";
        }).flavor_text,
        name
      );
      return {
        ...state,
        answer: name,
        natural: action.payload.flavor_text_entries.find(entry => {
          return entry.language.name === "en";
        }).flavor_text,
        entry,
        question
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modal: null
      };
    case "OPEN_MODAL":
      return {
        ...state,
        entry: "",
        modal: {
          message: state.modal.message,
          color: state.modal.color,
          pokeName: action.payload.pokeName,
          pokeDesc: action.payload.pokeDesc,
          pokeSpriteUrl: action.payload.pokeSpriteUrl
        }
      };
    default:
      return state;
  }
};

export default rootReducer;

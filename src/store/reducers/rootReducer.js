var initState = {
  entry: "",
  answer: "",
  score: 0,
  question: 0
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
      var score = state.score + 1;
      return {
        ...state,
        score
      };
    case "ANSWER_INCORRECT":
      return {
        ...state
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
        entry,
        question
      };
    default:
      return state;
  }
};

export default rootReducer;

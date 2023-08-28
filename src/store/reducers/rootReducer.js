const initState = {
  entry: "",
  answer: "",
  score: 0,
  question: 0,
  modal: null,
  alreadyAnswered: [],
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "ANSWER_CORRECT":
      const score = state.score + 1;
      return {
        ...state,
        modal: {
          ...action.payload
        },
        score
      };
    case "ANSWER_INCORRECT":
      return {
        ...state,
        modal: {
          ...action.payload
        }
      };
    case "GET_POKE":
      const { name, natural, entry, question, alreadyAnswered } = action.payload;
      return {
        ...state,
        answer: name,
        natural,
        entry,
        question,
        alreadyAnswered
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
          ...state.modal,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export default rootReducer;

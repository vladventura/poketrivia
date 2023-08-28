const initState = {
  entry: "",
  answer: "",
  score: 0,
  question: 0,
  modal: null,
  alreadyAnswered: [],
  hintText: "",
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "SUBMIT_ANSWER":
      const { modalInfo, score } = action.payload;
      return {
        ...state,
        modal: {
          ...modalInfo
        },
        score
      };
    case "GET_POKE":
      const { name, natural, entry, question, alreadyAnswered, hintText } = action.payload;
      return {
        ...state,
        answer: name,
        natural,
        entry,
        question,
        alreadyAnswered,
        hintText
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

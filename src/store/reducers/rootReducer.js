const initState = {
  entry: "",
  answer: "",
  natural: "",
  familyTree: [],
  score: 0,
  question: 0,
  modal: null,
  alreadyAnswered: [],
  hintText: "",
  id: 0,
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
      return {
        ...state,
        ...action.payload,
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

/*
    Send different types of actions depending on where user is
    switch behavior
*/
export const searchReducer = (state = { text: "" }, action) => {
  switch (action.type) {
    //type payload case TYPE: return PAYLOAD
    //this will be available in state

    case "SEARCH_QUERY":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

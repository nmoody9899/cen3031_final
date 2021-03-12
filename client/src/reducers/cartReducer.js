let initialState = [];

//load cart items from local storage

/*
    Send different types of actions depending on where user is
    switch behavior
*/
if (typeof window !== "undefined") {
  if (localStorage.getItem("cart")) {
    initialState = JSON.parse(localStorage.getItem("cart"));
  } else {
    initialState = [];
  }
}
export function cartReducer(state = initialState, action) {
  switch (action.type) {
    //type payload case TYPE: return PAYLOAD
    //this will be available in state

    case "ADD_TO_CART":
      return action.payload;

    default:
      return state;
  }
}

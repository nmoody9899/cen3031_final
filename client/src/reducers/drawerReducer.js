export function drawerReducer(state = false, action) {
  switch (action.type) {
    //type payload case TYPE: return PAYLOAD
    //this will be available in state

    case "SET_VISIBLE":
      return action.payload;

    default:
      return state;
  }
}

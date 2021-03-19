export function cashOnDeliveryReducer(state = false, action) {
  switch (action.type) {
    //type payload case TYPE: return PAYLOAD
    //this will be available in state

    case "CASH_ON_DELIVERY":
      return action.payload;

    default:
      return state;
  }
}

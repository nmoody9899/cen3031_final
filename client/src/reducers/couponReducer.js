export function couponReducer(state = false, action) {
  switch (action.type) {
    //type payload case TYPE: return PAYLOAD
    //this will be available in state

    case "COUPON_APPLIED":
      return action.payload;

    default:
      return state;
  }
}

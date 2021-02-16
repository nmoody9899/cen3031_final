/*
    Send different types of actions depending on where user is
    switch behavior
*/
 export function userReducer( state = null, action ){
    switch( action.type ){
        //type payload case TYPE: return PAYLOAD
        //this will be available in state

        case "LOGGED_IN_USER": 
            return action.payload;
           
        case "LOGOUT":
            return action.payload; //user: {}    

        default:
            return state;

    }
}
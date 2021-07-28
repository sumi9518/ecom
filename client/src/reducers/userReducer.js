export function userReducer(state = null, action) {
    switch (action.type) {
        case "Logged_In_User":
            return action.payload;
        case "Logout":
            return action.payload;
        default:
            return state;
    }
}
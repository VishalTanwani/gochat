export const initialState = {
    user: null,
}

export const actionTypes = {
    REGISTER_LOGIN: "REGISTER_LOGIN",
    GET_PROFILE: "GET_PROFILE",
    TRANSACTION_ERROR: "TRANSACTION_ERROR",
}

const reducer = (state, action) => {
    switch (action.type) {
        case "REGISTER_LOGIN":
            return {
                ...state,
                user: action.payload
            }
        case "GET_PROFILE":
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export default reducer
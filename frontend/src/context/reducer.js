export const initialState = {
    user: null,
    userRooms: null,
    alertStatus: null,
    alertMessage: null,
}

export const actionTypes = {
    REGISTER_LOGIN: "REGISTER_LOGIN",
    GET_PROFILE: "GET_PROFILE",
    GET_ROOMS: "GET_ROOMS",
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
        case "GET_ROOMS":
            return {
                ...state,
                userRooms: action.payload
            }
        case "TRANSACTION_ERROR":
            return {
                ...state,
                alertStatus: action.status,
                alertMessage: action.message
            }
        default:
            return state;
    }
}

export default reducer
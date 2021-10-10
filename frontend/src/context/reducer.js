export const initialState = {
    user: null,
}

export const actionTypes = {
    REGISTER_LOGIN: "REGISTER_LOGIN",
    TRANSACTION_ERROR: "TRANSACTION_ERROR",
}

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
}

export default reducer
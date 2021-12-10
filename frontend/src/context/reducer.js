export const initialState = {
    user: null,
    userRooms: null,
    userStory: null,
    searchRooms:[],
    currentRoom: null,
    alertStatus: null,
    alertMessage: null,
    profileStatue: null,
    storyStatus: null,
    groupDescStatus: null,
    messages: [],
}

export const actionTypes = {
    REGISTER_LOGIN: "REGISTER_LOGIN",
    UPDATE_USER: "UPDATE_USER",
    GET_PROFILE: "GET_PROFILE",
    GET_ROOMS: "GET_ROOMS",
    TRANSACTION_ERROR: "TRANSACTION_ERROR",
    PROFILE_OPNER: "PROFILE_OPNER",
    SET_ROOM: "SET_ROOM",
    LEFT_ROOM: "LEFT_ROOM",
    GET_MESSAGES: "GET_MESSAGES",
    GROUP_DESC_OPENER: "GROUP_DESC_OPENER",
    SEARCH_ROOM: "SEARCH_ROOM",
    SET_STORY: "SET_STORY",
    OPEN_STORY: "OPEN_STORY"
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
        case "PROFILE_OPNER":
            return {
                ...state,
                profileStatue: action.status
            }
        case "GROUP_DESC_OPENER":
                return {
                    ...state,
                    groupDescStatus: action.status
                }
        case "UPDATE_USER":
            return{
                ...state,
                user: action.payload
            }
        case "SET_ROOM":
            return{
                ...state,
                currentRoom: action.payload,
                searchRooms: []
            }
        case "LEFT_ROOM":
            return{
                ...state,
                currentRoom: null
            }
        case "GET_MESSAGES":
            return{
                ...state,
                messages: action.payload === null ? [] : action.payload
            }
        case "SEARCH_ROOM":
            return{
                ...state,
                searchRooms: action.payload === null ? [] : action.payload
            }
        case "SET_STORY":
            return{
                ...state,
                userStory: action.payload
            }
        case "OPEN_STORY":
            return{
                ...state,
                storyStatus: action.payload
            }
        default:
            return state;
    }
}

export default reducer
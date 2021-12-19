import React, { createContext, useReducer } from "react";
import reducer, { actionTypes, initialState } from "./reducer";
import axios from "axios";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {
    user: state.user,
    userRooms: state.userRooms,
    currentRoom: state.currentRoom,
    alertStatus: state.alertStatus,
    alertMessage: state.alertMessage,
    profileStatue: state.profileStatue,
    messages: state.messages,
    groupDescStatus: state.groupDescStatus,
    searchRooms: state.searchRooms,
    userStory: state.userStory,
    storyStatus: state.storyStatus,
    imageViewerStatus: state.imageViewerStatus,
    image: state.image,
    unifiedRegister: (email) => {
      axios
        .post(process.env.REACT_APP_API_ENDPOINT + "/user/register", {
          "Content-Type": "application/json",
          email: email,
        })
        .then(function (response) {
          console.log(response)
          window.localStorage["token"] = response.data.token;
          dispatch({
            type: actionTypes.REGISTER_LOGIN,
            payload: response.data,
          });
          window.location.href = "/whatsapp"
        })
        .catch(function (error) {
          console.log(error);
          dispatch({
            type: actionTypes.TRANSACTION_ERROR,
            status: true,
            message: "Network error",
          });
        });
    },
    getProfile: async () => {
      axios
        .post(process.env.REACT_APP_API_ENDPOINT + "/user/profile", {
          "Content-Type": "application/json",
          token: window.localStorage["token"],
        })
        .then(function (response) {
          dispatch({
            type: actionTypes.GET_PROFILE,
            payload: response.data,
          });
        })
        .catch(function (error) {
          console.log(error);
          dispatch({
            type: actionTypes.TRANSACTION_ERROR,
            status: true,
            message: "Network error",
          });
        });
    },
    getRooms: async () => {
      axios
        .post(process.env.REACT_APP_API_ENDPOINT + "/user/rooms", {
          "Content-Type": "application/json",
          token: window.localStorage["token"],
        })
        .then(function (response) {
          dispatch({
            type: actionTypes.GET_ROOMS,
            payload: response.data,
          });
        })
        .catch(function (error) {
          console.log(error);
          dispatch({
            type: actionTypes.TRANSACTION_ERROR,
            status: true,
            message: "Network error",
          });
        });
    },
    updateUser: async (name, about) => {
      axios
        .post(process.env.REACT_APP_API_ENDPOINT + "/user/update", {
          "Content-Type": "application/json",
          token: window.localStorage["token"],
          name: name,
          about: about,
        })
        .then(function (response) {
          dispatch({
            type: actionTypes.UPDATE_USER,
            payload: response.data,
          });
        })
        .catch(function (error) {
          console.log(error);
          dispatch({
            type: actionTypes.TRANSACTION_ERROR,
            status: true,
            message: "Network error",
          });
        });
    },
    openAlert: (status, message) => {
      dispatch({
        type: actionTypes.TRANSACTION_ERROR,
        status: status,
        message: message,
      });
    },
    closeAlert: (status, message) => {
      dispatch({
        type: actionTypes.TRANSACTION_ERROR,
        status: status,
        message: message,
      });
    },
    openProfile: (status) => {
      dispatch({
        type: actionTypes.PROFILE_OPNER,
        status: status,
      });
    },
    openGroupDesc: (status) => {
      dispatch({
        type: actionTypes.GROUP_DESC_OPENER,
        status: status,
      });
    },
    selectRoom: (_id) => {
      axios
        .post(process.env.REACT_APP_API_ENDPOINT + "/room/details", {
          "Content-Type": "application/json",
          token: window.localStorage["token"],
          _id: _id,
        })
        .then(function (response) {
          dispatch({
            type: actionTypes.SET_ROOM,
            payload: response.data,
          });
        })
        .catch(function (error) {
          console.log(error);
          dispatch({
            type: actionTypes.TRANSACTION_ERROR,
            status: true,
            message: "Network error",
          });
        });
    },
    leftRoom: (id) => {
      axios
      .post(process.env.REACT_APP_API_ENDPOINT + "/room/leave", {
        "Content-Type": "application/json",
        token: window.localStorage["token"],
        _id:id
      })
      .then(function () {
        dispatch({
          type: actionTypes.LEFT_ROOM
        })
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: actionTypes.TRANSACTION_ERROR,
          status: true,
          message: "Network error",
        });
      });
      
    },
    joinGroup: (id) => {
      axios
      .post(process.env.REACT_APP_API_ENDPOINT + "/room/join", {
        "Content-Type": "application/json",
        token: window.localStorage["token"],
        _id: id
      })
      .then(function (response) {
        dispatch({
          type: actionTypes.SET_ROOM,
          payload: response.data,
        })
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: actionTypes.TRANSACTION_ERROR,
          status: true,
          message: "Network error",
        });
      });
      
    },
    getMessages: (room,id) => {
      axios.post(process.env.REACT_APP_API_ENDPOINT + "/message/get", {
        "Content-Type": "application/json",
          token: window.localStorage["token"],
          name: room,
          _id: id
      })
      .then(function (response) {
        dispatch({
          type: actionTypes.GET_MESSAGES,
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: actionTypes.TRANSACTION_ERROR,
          status: true,
          message: "Network error",
        });
      });
    },
    updateRoom: (name, description) => {
      axios
      .post(process.env.REACT_APP_API_ENDPOINT + "/room/update", {
        "Content-Type": "application/json",
        token: window.localStorage["token"],
        _id: state.currentRoom._id,
        name: name,
        description: description,
      })
      .then(function (response) {
        dispatch({
          type: actionTypes.SET_ROOM,
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: actionTypes.TRANSACTION_ERROR,
          status: true,
          message: "Network error",
        });
      });
    },
    searchRoom: (name) => {
      axios
        .post(process.env.REACT_APP_API_ENDPOINT + "/room/search", {
          "Content-Type": "application/json",
          token: window.localStorage["token"],
          name: name,
        })
        .then(function (response) {
          dispatch({
            type: actionTypes.SEARCH_ROOM,
            payload: name === "" ? [] : response.data,
          });
        })
        .catch(function (error) {
          console.log(error);
          dispatch({
            type: actionTypes.TRANSACTION_ERROR,
            status: true,
            message: "Network error",
          });
        });
    },
    createRoom: (response) => {
          dispatch({
            type: actionTypes.SET_ROOM,
            payload: response.data,
          });
    },
    sendMessage: (msg) => {
      axios.post(process.env.REACT_APP_API_ENDPOINT + "/message/send", {
        "Content-Type": "application/json",
          token: window.localStorage["token"],
          ...msg
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: actionTypes.TRANSACTION_ERROR,
          status: true,
          message: "Network error",
        });
      });
    },
    displayError: (err) => {
      dispatch({
        type: actionTypes.TRANSACTION_ERROR,
        status: true,
        message: "Network error",
      });
    },
    logout: () => {
      window.localStorage.clear()
      window.location.href = "/login"
    },
    setStory: (body) => {
      axios
        .post(process.env.REACT_APP_API_ENDPOINT + "/story/create", {
          "Content-Type": "application/json",
          token: window.localStorage["token"],
          body: body
        })
        .then(function (response) {
          dispatch({
            type: actionTypes.SET_STORY,
            payload: response.data,
          });
        })
        .catch(function (error) {
          console.log(error);
          dispatch({
            type: actionTypes.TRANSACTION_ERROR,
            status: true,
            message: "Network error",
          });
        });
        window.location.href = "/whatsapp"

    },
    getStory: () => {
      axios
        .post(process.env.REACT_APP_API_ENDPOINT + "/story/get", {
          "Content-Type": "application/json",
          token: window.localStorage["token"],
        })
        .then(function (response) {
          dispatch({
            type: actionTypes.SET_STORY,
            payload: response.data,
          });
        })
        .catch(function (error) {
          console.log(error);
          dispatch({
            type: actionTypes.TRANSACTION_ERROR,
            status: true,
            message: "Network error",
          });
        });
    },
    openStory: (status) => {
      dispatch({
        type: actionTypes.OPEN_STORY,
        payload: status
      })
    },
    imageViewer: (status, image) => {
      dispatch({
        type: actionTypes.OPEN_IMAGE_VIEWER,
        payload: {status, image}
      })
    }
  };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

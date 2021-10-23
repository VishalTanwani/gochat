import React, { createContext, useReducer } from "react";
import reducer, { actionTypes, initialState } from "./reducer";
import axios from "axios";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {
    user: state.user,
    userRooms: state.userRooms,
    alertStatus: state.alertStatus,
    alertMessage: state.alertMessage,
    profileStatue: state.profileStatue,
    unifiedRegister: async (email) => {
      axios
        .post(process.env.REACT_APP_API_ENDPOINT + "/user/register", {
          "Content-Type": "application/json",
          email: email,
        })
        .then(function (response) {
          window.localStorage["token"] = response.data.token;
          dispatch({
            type: actionTypes.REGISTER_LOGIN,
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
    getProfile: async (token) => {
      axios
        .post(process.env.REACT_APP_API_ENDPOINT + "/user/profile", {
          "Content-Type": "application/json",
          token: token,
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
    getRooms: async (token) => {
      axios
        .post(process.env.REACT_APP_API_ENDPOINT + "/user/rooms", {
          "Content-Type": "application/json",
          token: token,
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
    closeAlert: (status, message) => {
      dispatch({
        type: actionTypes.TRANSACTION_ERROR,
        status: status,
        message: message,
      });
    },
    openProfile: (status) => {
      console.log(status)
      dispatch({
        type: actionTypes.PROFILE_OPNER,
        status: status,
      });
    },
  };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

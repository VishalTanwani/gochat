import React, { createContext, useReducer } from "react";
import reducer, { actionTypes, initialState } from "./reducer";
import axios from "axios";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {
    state: state,
    unifiedRegister: async (email) => {
      axios
        .post(window.global.api_location + "/user/register", {
          "Content-Type": "application/json",
          email: email,
        })
        .then(function (response) {
          console.log(response);
          dispatch({
            type: actionTypes.REGISTER_LOGIN,
            payload: response.data,
          });
        })
        .catch(function (error) {
          console.log(error);
          dispatch({
            type: actionTypes.TRANSACTION_ERROR,
            payload: error,
          });
        });
    },
  };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

import { handleAction, combineActions } from "redux-actions";

import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_RESET,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_RESET,
  SIGNOUT_REQUEST,
  signinRequest,
  signinFailure,
  signinReset,
  signinSuccess,
  signupRequest,
  signupFailure,
  signupReset,
  signupSuccess
} from "./actions";

const initialState = {
  user: {},
  token: "",

  loggedIn: false,

  signinInProgress: false,
  signinHasError: false,
  signinCompleted: false,
  signinError: "",

  signupInProgress: false,
  signupHasError: false,
  signupCompleted: false,
  sigupError: ""
};

export const ui = handleAction(
  combineActions(
    signinRequest,
    signinFailure,
    signinReset,
    signinSuccess,
    signupFailure,
    signupReset,
    signupRequest,
    signupSuccess
  ),
  {
    next(state = initialState, action) {
      const { payload } = action;
      switch (action.type) {
        case SIGNIN_REQUEST:
          return {
            ...state,
            signinInProgress: true,
            signinHasError: false,
            signinCompleted: false
          };
        case SIGNIN_FAILURE:
          return {
            ...state,
            signinInProgress: false,
            signinHasError: true,
            signinCompleted: true,
            signinError: payload.detail
          };
        case SIGNIN_SUCCESS:
          return {
            ...state,
            user: payload.user,
            token: payload.token,
            loggedIn: true,
            signinInProgress: false,
            signinHasError: false,
            signinCompleted: true
          };
        case SIGNIN_RESET:
          return {
            ...state,
            signinInProgress: false,
            signinHasError: false,
            signinCompleted: false
          };

        case SIGNUP_REQUEST:
          return {
            ...state,
            signupInProgress: true,
            signupHasError: false,
            signupCompleted: false
          };

        case SIGNUP_FAILURE:
          return {
            ...state,
            signupInProgress: false,
            signupHasError: true,
            signupCompleted: true,
            signupError: payload.detail
          };

        case SIGNUP_SUCCESS:
          return {
            ...state,
            user: payload.user,
            token: payload.token,
            loggedIn: true,
            signupInProgress: false,
            signupHasError: false,
            signupCompleted: true
          };

        case SIGNUP_RESET:
          return {
            ...state,
            signupInProgress: false,
            signupHasError: false,
            signupCompleted: false
          };

        case SIGNOUT_REQUEST:
          return {
            ...state,
            user: {},
            token: "",

            loggedIn: false,

            signinInProgress: false,
            signinHasError: false,
            signinCompleted: false,
            signinError: ""
          };

        default:
          return {
            ...state
          };
      }
    },

    throw(state,action){
        var newState = {
            ...state
        }
        return newState;
    }
  },
  initialState
);

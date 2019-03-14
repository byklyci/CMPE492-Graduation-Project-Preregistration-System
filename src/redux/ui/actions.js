import { createAction } from 'redux-actions'

export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILURE";
export const SIGNIN_RESET = "SIGNIN_RESET";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const SIGNUP_RESET = "SIGNUP_RESET";

export const SIGNOUT_REQUEST = "SIGNOUT_REQUEST";

/*
export const signinRequest = createAction('SIGNIN_REQUEST');
export const signinSuccess = createAction('SIGNIN_SUCCESS');
export const signinFailure = createAction('SIGNIN_FAILURE');
export const signinReset = createAction('SIGNIN_RESET');

export const signupRequest = createAction('SIGNUP_REQUEST');
export const signupSuccess = createAction('SIGNUP_SUCCESS');
export const signupFailure = createAction('SIGNUP_FAILURE');
export const signupReset = createAction('SIGNUP_RESET');

export const signoutRequest = createAction('SIGNOUT_REQUEST');
*/


export const signinRequest = (email, password) => ({
    type: SIGNIN_REQUEST,
    payload: {
        email,
        password
    }
});

export const signinSuccess = res => ({
    type: SIGNIN_SUCCESS,
    payload: res
});

export const signinFailure = errorData => ({
    type: SIGNIN_FAILURE,
    payload: errorData
});

export const signinReset = () => ({
    type: SIGNIN_RESET
});
 
export const signupRequest =(name, phone, email, password) => ({
    type: SIGNUP_REQUEST,
    payload: {
        email,
        password,
        name,
        phone
    }
});

export const signupSuccess = res => ({
    type : SIGNUP_SUCCESS,
    payload: res
});

export const signupFailure = errorData => ({
    type : SIGNUP_FAILURE,
    payload: errorData
});

export const signupReset = () => ({
    type : SIGNUP_RESET,

});

export const signoutRequest = () => ({
    type: SIGNOUT_REQUEST
});

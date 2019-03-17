import { call, put, takeLatest } from "redux-saga/effects";

import api from "./api";

import { SIGNIN_REQUEST, SIGNUP_REQUEST, FETCH_LESSONS_REQUEST } from "./actions.js";

import {
  signinSuccess,
  signinFailure,
  signupFailure,
  signupSuccess,
  fetchLessonsFailure,
  fetchLessonsSuccess
} from "./actions";

function* signinRequest(action) {
  const { email, password } = action.payload;

  try {
    const signinResponse = yield call(api.doSignIn, email, password);
    console.log(signinResponse);

    if (signinResponse) {
      if (signinResponse.status === 200) {
        yield put(signinSuccess(signinResponse));
      } else if (signinResponse.status === 400) {
        yield put(signinFailure(signinResponse));
      } else {
        yield put(signinFailure({ detail: "unknown" }));
      }
    } else {
      yield put(signinFailure({ detail: "no response from api" }));
    }
  } catch (err) {
    yield put(signinFailure({ detail: err.detail }));
  }
}

function* signupRequest(action) {
  const { name, phone, email, password } = action.payload;
  const first_name = name;
  const last_name = "mfg";
  const phone_number = phone;

  try {
    const signupResponse = yield call(api.doSignUp, first_name, last_name, phone_number, password, email);

    if (signupResponse) {
      if (signupResponse.status === 201) {
        yield put(signupSuccess(signupResponse));
      } else if (signupResponse.status === 400) {
        yield put(signupFailure(signupResponse));
      } else {
        yield put(signupFailure({ detail: "unknown" }));
      }
    } else {
      yield put(signupFailure({ detaii: "no response fetched" }));
    }
  } catch (err) {
    yield put(signupFailure({ detail: err.detail }));
  }
}

function* fetchLessonsRequest(action) {
  try {
    const FetchLessonsResponse = yield call(api.doFetchLessons);

    if (FetchLessonsResponse) {
      if (FetchLessonsResponse.status === 200) {
        yield put(fetchLessonsSuccess(FetchLessonsResponse));
      } else if (FetchLessonsResponse.status === 400) {
        yield put(fetchLessonsFailure(FetchLessonsResponse));
      } else {
        yield put(fetchLessonsFailure({ detail: "unknown" }));
      }
    } else {
      yield put(fetchLessonsFailure({ detaii: "no response fetched" }));
    }
  } catch (err) {
    yield put(fetchLessonsFailure({ detail: err.detail }));
  }
}

const saga = function*() {
  yield takeLatest(SIGNIN_REQUEST, signinRequest);
  yield takeLatest(SIGNUP_REQUEST, signupRequest);
  yield takeLatest(FETCH_LESSONS_REQUEST, fetchLessonsRequest);
};

export default saga;

import { types } from "./types";

export function getUserValues(users) {
  return {
    type: types.GET_USER_VALUES,
    payload: {
      users,
    },
  };
}

export function setToken(token) {
  return {
    type: types.SET_TOKEN,
    payload: {
      token,
    },
  };
}

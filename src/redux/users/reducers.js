import { types } from "./types";

let initialState = {
  token: null,
  users: null,
  sidebarShow: "responsive",
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "set":
      return { ...state, sidebarShow: action.sidebarShow };
    case types.GET_USER_VALUES:
      return {
        ...state,
        users: action.payload.users,
      };
    case types.SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };
    default: {
      return state;
    }
  }
};
export default userReducer;

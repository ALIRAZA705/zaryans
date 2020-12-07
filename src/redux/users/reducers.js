import { types } from "./types";
const access_token=sessionStorage.getItem("access_token")
let initialState = {
  token: access_token,
  users: null,
  national_id:12345,
  roles:"admin",
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
      case types.GET_nationalid:
      return {
        ...state,
        national_id: action.payload.national_id,
      };
      case types.GET_SET_Role:
        return {
          ...state,
          roles: action.payload.roles,
        };
    default: {
      return state;
    }
  }
};
export default userReducer;

import * as actions from "../actions/actionTypes";

const initialState = {
  loggedIn: false,
  currentUser: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGN_IN:
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        currentUser: {
          ...state.currentUser,
          access_token: action.payload.currentUser.access_token,
          id: action.payload.currentUser.id,
          username: action.payload.currentUser.username,
          name: action.payload.currentUser.name,
          role: action.payload.currentUser.role,
        },
      };
    case actions.SIGN_OUT:
      return {
        ...state,
        loggedIn: false,
        currentUser: {},
      };
    default:
      return state;
  }
};

export default authReducer;

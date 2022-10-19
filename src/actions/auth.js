import * as actions from "./actionTypes";

export const signIn = (user) => ({
  type: actions.SIGN_IN,
  payload: {
    loggedIn: true,
    currentUser: user,
  },
});

export const signOut = () => ({
  type: actions.SIGN_OUT,
  payload: {
    loggedIn: false,
    currentUser: {},
  },
});

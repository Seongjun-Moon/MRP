import UserActionTypes from "./user.types";

const initialState = {
  isLoggedIn: false,
};

const signin = (prevState, newState) => {
  return newState;
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.SIGNIN:
      return signin(state, action.payload);

    default:
      return state;
  }
};

export default userReducer;

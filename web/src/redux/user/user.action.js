import UserActionTypes from "./user.types";

const signin = (item) => ({
  type: UserActionTypes.SIGNIN,
  payload: item,
});

export default signin;

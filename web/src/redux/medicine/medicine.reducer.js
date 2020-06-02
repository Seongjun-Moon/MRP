import MedicineActionTypes from "./medicine.types";

const initialState = {
  mediCode: null,
};

const senddata = (prevState, newState) => {
  return newState;
};

const medicineReducer = (state = initialState, action) => {
  switch (action.type) {
    case MedicineActionTypes.SENDDATA:
      return senddata(state, action.payload);

    default:
      return state;
  }
};

/* const medicineReducer = handleAction(
  {
    senddata: (state, action) => state,
  },
  initialState
); */

export default medicineReducer;

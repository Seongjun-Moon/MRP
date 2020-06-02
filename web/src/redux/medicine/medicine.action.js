import MedicineActionTypes from "./medicine.types";

const senddata = (item) => ({
  type: MedicineActionTypes.SENDDATA,
  payload: item,
});

export default senddata;

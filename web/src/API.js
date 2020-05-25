import axios from "axios";

axios.defaults.withCredentials = true;

const url = "70.12.113.182:9090";

const getMedicineInfo = () => {
  return axios.post(`http://${url}/oversee/mediInfo`, {});
};

/* const getUerInfo = () => {
  return axios.post(`http://${url}/oversee/userInfo`, {});
}; */

const createCompanyInfo = (companyCode, companyName, companyType) => {
  return axios.post(`http://${url}/manufacture/companyEnroll`, {
    companyCode,
    companyName,
    companyType,
  });
};

const getCompanyInfo = () => {
  return axios.post(`http://${url}/manufacture/companyInfo`, {});
};

const getCustomer = (email, password, section) => {
  return axios.post(`http://${url}/`, {
    email,
    password,
    section,
  });
};

const addCustomer = (email, password, section) => {
  return axios.post(`http://${url}/`, {
    email,
    password,
    section,
  });
};

export default {
  getMedicineInfo,
  createCompanyInfo,
  getCompanyInfo,
  getCustomer,
  addCustomer,
  /* getUerInfo, */
};

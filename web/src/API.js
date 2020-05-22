import axios from "axios";

axios.defaults.withCredentials = true;

const url = "70.12.113.182:9090";

const getMedicineInfo = () => {
  return axios.post(`http://${url}/oversee/mediInfo`, {});
};

const createCompanyInfo = (companyCode, companyName, companyType) => {
  return axios.post(`http://${url}/manufacture/companyEnroll`, {
    companyCode,
    companyName,
    companyType,
  });
};

export default {
  getMedicineInfo,
  createCompanyInfo,
};

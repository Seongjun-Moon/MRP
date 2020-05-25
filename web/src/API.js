import axios from "axios";

axios.defaults.withCredentials = true;

const url = "70.12.113.182:9090";

/*
 *  업체 CRUD
 */

/* 유저 정보 */
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

/* 로그인 */
const getCustomer = (email, password, section) => {
  return axios.post(`http://${url}/`, {
    email,
    password,
    section,
  });
};
/* 회원가입 */
const addCustomer = (email, password, section) => {
  return axios.post(`http://${url}/`, {
    email,
    password,
    section,
  });

/*
 * 의약품 CRUD
 */

const createMedicineInfo = (
  mediCode,
  companyCode,
  mediName,
  mediType,
  count,
  permissionDate,
  cancelDate
) => {
  return axios.post(`http://${url}/oversee/mediEnroll`, {
    mediCode,
    companyCode,
    mediName,
    mediType,
    count,
    permissionDate,
    cancelDate,
  });
};

const getMedicineInfo = () => {
  return axios.post(`http://${url}/oversee/mediInfo`, {});

};

export default {
  createCompanyInfo,
  getCompanyInfo,
  getCustomer,
  addCustomer,
  /* getUerInfo, */
  createMedicineInfo,
  getMedicineInfo,
};

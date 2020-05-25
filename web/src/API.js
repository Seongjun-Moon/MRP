import axios from "axios";

axios.defaults.withCredentials = true;

const url = "70.12.113.182:9090";

/*
 *  업체 CRUD
 */

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
  createMedicineInfo,
  getMedicineInfo,
};

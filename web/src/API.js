import axios from "axios";

axios.defaults.withCredentials = true;

// const url = "70.12.113.180:9090";
const url = "70.12.227.32:9090";
// const url = "localhost:9090";

/*
 *  업체 CRUD
 */

/* 유저 페이지 조회 */
const getUserInfo = () => {
  return axios.post(`http://${url}/user/userInfo`, {});
};

const createCompanyInfo = (companyCode, companyName, companyType) => {
  return axios.post(`http://${url}/company/companyEnroll`, {
    companyCode,
    companyName,
    companyType,
  });
};

const getCompanyInfo = () => {
  return axios.post(`http://${url}/company/companyInfo`, {});
};

/* 로그인 */
const getUser = (id, pw) => {
  return axios.post(`http://${url}/user/signIn`, {
    id,
    pw,
  });
};

/* 로그아웃 */
const logout = () => {
  return axios.get(`http://${url}/user/logout`);
};

/* 회원가입 */
const addUser = (id, pw, companyCode) => {
  return axios.post(`http://${url}/user/signUp`, {
    id,
    pw,
    companyCode,
  });
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
  return axios.post(`http://${url}/medicine/mediEnroll`, {
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
  return axios.post(`http://${url}/medicine/mediInfo`, {});
};

const getSearchedMedicineInfo = (keyword) => {
  return axios.post(`http://${url}/medicine/searchedMediInfo`, { keyword });
};

/*
 * 임시 유통 이력
 */

/* 유통 조회 */
const getTempDistInfo = (mediCode) => {
  return axios.post(`http://${url}/distribution/tempDistInfo`, { mediCode });
};

/*
 * 체인코드
 */

/* 지갑 생성 */
const chaincodeConnect = () => {
  return axios.post(`http://${url}/chaincode/connect`, {});
};

/* 임시 유통이력을 블록체인 서버로 전송 */
const createDistInfo = () => {
  return axios.post(`http://${url}/chaincode/update`, {});
};

/* 의약품별 최신 유통 이력 목록 */
const getDistLatestInfo = (mediCode) => {
  return axios.post(`http://${url}/chaincode/barcodeList`, { mediCode });
};

/* 바코드별 유통 이력 목록 */
const getDistHistory = (barcode) => {
  return axios.post(`http://${url}/chaincode/history`, { barcode });
};

/* 바코드의 의약품명 조회 */
const getMedicineName = (barcode) => {
  return axios.post(`http://${url}/medicine/getMediName`, { barcode });
};

export default {
  createCompanyInfo,
  getCompanyInfo,
  getUser,
  logout,
  addUser,
  getUserInfo,
  createMedicineInfo,
  getMedicineInfo,
  getSearchedMedicineInfo,
  getTempDistInfo,
  chaincodeConnect,
  createDistInfo,
  getDistLatestInfo,
  getMedicineName,
  getDistHistory,
};

import axios from "axios";

axios.defaults.withCredentials = true;

const url = "70.12.113.180:9090";
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

/* 업체 회원 등록 (링크는 아직 안맞춤) */
const createCompanyUserInfo = (companyCode, companyId, companyPw) => {
  return axios.post(`http://${url}/user/companyUserEnroll`, {
    companyCode,
    companyId,
    companyPw,
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
 * 유통 이력
 */
const getDistInfo = (mediCode) => {
  // return axios.post(`http://${url}/distribution/tempDistInfo`, { mediCode });
};

export default {
  createCompanyInfo,
  createCompanyUserInfo,
  getCompanyInfo,
  getUser,
  logout,
  addUser,
  getUserInfo,
  createMedicineInfo,
  getMedicineInfo,
  getSearchedMedicineInfo,
  getTempDistInfo,
  getDistInfo,
};

/*
 * 체인코드
 */

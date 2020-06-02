const express = require("express");
const router = express.Router();
const {
  searchCompanyByName,
  companyEnroll,
  companyInfo,
} = require("../controllers/companyController");

//React Native에서 회사명 검색
router.post("/searchCompanyByName", searchCompanyByName);
//업체 등록
router.post("/companyEnroll", companyEnroll);
// 업체 정보 조회
router.post("/companyInfo", companyInfo);

module.exports = router;

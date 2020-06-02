const express = require("express");
const router = express.Router();
const {
  companyEnroll,
  companyInfo,
} = require("../controllers/companyController");

//업체 등록
router.post("/companyEnroll", companyEnroll);
// 업체 정보 조회
router.post("/companyInfo", companyInfo);

module.exports = router;

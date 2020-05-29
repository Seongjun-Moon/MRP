const express = require("express");
const router = express.Router();
const {
  productEnroll,
  search,
  tempDistInfo,
  companyEnroll,
  companyInfo,
} = require("../controllers/distributorController");

// 의약품 임시 유통이력 조회
router.post("/tempDistInfo", tempDistInfo);
// 입,출고 등록
router.post("/productEnroll", productEnroll);
// 의약품 유통이력 조회
router.post("/search", search);
//업체 등록
router.post("/companyEnroll", companyEnroll);
// 업체 정보 조회
router.post("/companyInfo", companyInfo);

module.exports = router;

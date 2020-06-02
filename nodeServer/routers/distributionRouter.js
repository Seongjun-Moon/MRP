const express = require("express");
const router = express.Router();
const {
  productEnroll,
  search,
  tempDistInfo,
} = require("../controllers/distributionController");

// 입,출고 등록
router.post("/productEnroll", productEnroll);
// 의약품 유통이력 조회
router.post("/search", search);
// 의약품 임시 유통이력 조회
router.post("/tempDistInfo", tempDistInfo);

module.exports = router;

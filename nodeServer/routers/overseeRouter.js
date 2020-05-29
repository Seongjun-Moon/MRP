const express = require("express");
const router = express.Router();
const {
  userInfo,
  search,
  mediEnroll,
  mediInfo,
  companyInfo,
  mediDetail,
  searchedMediInfo,
} = require("../controllers/overseeController");

//user 정보 조회
router.post("/userInfo", userInfo);
// 의약품 유통이력 조회
router.post("/search", search);
// 의약품 정보 등록
router.post("/mediEnroll", mediEnroll);
// 의약품 정보 조회
router.post("/mediInfo", mediInfo);
// 업체 정보 조회
router.post("/companyInfo", companyInfo);
// Select product info
router.post("/mediDetail", mediDetail);

router.post("/searchedMediInfo", searchedMediInfo);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  mediDetail,
  searchedMediInfo,
  mediEnroll,
  mediInfo,
  getMediName
} = require("../controllers/medicineController");

// 의약품 상세 조회
router.post("/mediDetail", mediDetail);
//
router.post("/searchedMediInfo", searchedMediInfo);
// 의약품 등록
router.post("/mediEnroll", mediEnroll);
// 의약품 조회
router.post("/mediInfo", mediInfo);

router.post("/getMediName", getMediName);

module.exports = router;

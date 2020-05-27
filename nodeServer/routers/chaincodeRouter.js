const express = require("express");
const router = express.Router();
const {
  connect,
  queryAll,
  register,
  update,
  history,
} = require("../controllers/chaincodeController");

// 1. MRP 블록체인 네트워크 연결 시도
router.get("/connect", connect);
// 2. 모든 전문의약품의 최신 유통정보 조회
router.get("/queryAll", queryAll);
// 3. 전문의약품 유통정보 신규등록 (제조)
router.post("/register", register);
// 4. 전문의약품 유통정보 등록 (도매, 병원 및 약국)
router.post("/update", update);
// 5. 특정 전문의약품의 유통 히스토리를 조회
router.post("/history", history);

module.exports = router;

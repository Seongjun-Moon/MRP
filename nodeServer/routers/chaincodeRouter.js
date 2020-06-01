const express = require("express")
const router = express.Router()
const {
  connect,
  getBarcode,
  register,
  update,
  history,
  barcodeList,
} = require("../controllers/chaincodeController")

// 1. MRP 블록체인 네트워크 연결 시도
router.get("/connect", connect)
// 2. 모든 전문의약품의 최신 유통정보 조회
router.post("/queryAll", getBarcode)
// 3. 전문의약품 유통정보 등록 (도매, 병원 및 약국)
router.post("/update", update)
// 4. 특정 전문의약품의 유통 히스토리를 조회
router.post("/history", history)
// 5. 표준코드에 대응하는 모든 바코드 항목을 조회
router.post("/barcodeList", barcodeList)

module.exports = router

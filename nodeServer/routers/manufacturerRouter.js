//제조사 라우터
const express = require("express");
const router = express.Router();
const company = require("../models").Company;

// 의약품 유통이력 조회
router.post("/search", (res, req) => {});

// 업체 등록
router.post("/companyEnroll", async (req, res) => {
  const companyCode = req.body.companyCode;
  const companyName = req.body.companyName;
  const companyType = req.body.companyType;

  try {
    const companyEnroll = await company.create({
      companyCode,
      companyName,
      companyType,
    });

    console.log(companyEnroll);
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// 업체 정보 조회
router.post("/companyInfo", async (req, res) => {
  try {
    const companyInfo = await company.findAll({
      attributes: ["companyCode", "companyName", "companyType"],
      order: [["companyCode", "ASC"]],
    });

    console.log(companyInfo);
    res.json(companyInfo);
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router;

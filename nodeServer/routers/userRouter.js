const express = require("express");
const router = express.Router();
const company = require("../models").Company;
const user = require("../models").User;

// 로그인
router.post("/signIn", async (req, res) => {
  const id = req.body.id;
  const password = req.body.pw;

  try {
    const signIn = await company.findOne({
      // join => user table + company table
      attributes: ["companyType"],
      include: {
        model: user,
        attributes: ["companyCode"],
        where: { id, password },
      },
    });
    console.log("/////////////////////////////////////////////////////");

    console.log(signIn.companyType);
    console.log("/////////////////////////////////////////////////////");

    res.json({ message: true, companyType: signIn.companyType });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

// 회원가입
router.post("/signUp", async (req, res) => {
  const id = req.body.id;
  const password = req.body.pw;
  const companyCode = req.body.companyCode;

  try {
    const signUp = await user.create({
      id,
      password,
      companyCode,
    });
    console.log(signUp);
    res.json({ message: id });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router;

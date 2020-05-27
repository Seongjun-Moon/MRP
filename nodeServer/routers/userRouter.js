const express = require("express");
const router = express.Router();
const { signIn, signUp } = require("../controllers/userController");

// 로그인
router.post("/signIn", signIn);
// 회원가입
router.post("/signUp", signUp);

module.exports = router;

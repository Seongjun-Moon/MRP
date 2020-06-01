const express = require("express");
const router = express.Router();
const { logout, signIn, signUp } = require("../controllers/userController");

//로그아웃
router.get("/logout", logout);
// 로그인
router.post("/signIn", signIn);
// 회원가입
router.post("/signUp", signUp);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  userInfo,
  logout,
  signIn,
  signUp,
  myPage,
} = require("../controllers/userController");

//유저 정보 조회
router.post("/userInfo", userInfo);
//로그아웃
router.get("/logout", logout);
// 로그인
router.post("/signIn", signIn);
// 회원가입
router.post("/signUp", signUp);
// 마이페이지 (비밀번호 변경)
router.post("/myPage", myPage);

module.exports = router;

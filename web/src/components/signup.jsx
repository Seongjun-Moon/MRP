import React from "react";

function Signup(props) {
  return (
    <div className="signin">
      <form action="" className="signin-form"></form>
      <h1>회원가입 페이지</h1>
      Email
      <input
        type="email"
        name="email"
        id="signup-email"
        placeholder="ID@example.com"
      />
      <br />
      PW
      <input
        type="password"
        name="password"
        id="signup-password"
        placeholder="영문, 숫자, 특수문자 조합 8~20자"
      />
      <br />
      PW Check
      <input
        type="password"
        name="password"
        id="signup-password"
        placeholder="비밀번호를 한번 더 입력해주세요."
      />
      <br />
      기관
      <select>
        <option value="factory">제조업체</option>
        <option value="wholesale">도매업체</option>
        <option value="hospital">병원</option>
        <option value="pharmacy">약국</option>
      </select>
      <br />
      <button onClick={props.login}>회원가입</button>
    </div>
  );
}

export default Signup;

import React from "react";

let emailInput = React.createRef();
let passwordInput = React.createRef();

function Signin(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    let email = emailInput.current.value;
    let password = passwordInput.current.value;
    if (email === "a@naver.com" && password === "1234") {
      props.login();
    } else alert("아이디 혹은 비밀번호가 일치 하지 않습니다.");
  };

  return (
    <div className="signin">
      <form onSubmit={(e) => handleSubmit(e)} action="" className="signin-form">
        Email
        <input
          type="email"
          name="email"
          id="signin-email"
          placeholder="ID@example.com"
          required
          ref={emailInput}
        />
        <br />
        PW
        <input
          type="password"
          name="password"
          id="signin-password"
          placeholder="비밀번호를 입력해주세요."
          required
          ref={passwordInput}
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
        <button type="submit">테스트 로그인</button>
        {/* <button onClick={props.login}>로그인</button> */}
      </form>
    </div>
  );
}

export default Signin;

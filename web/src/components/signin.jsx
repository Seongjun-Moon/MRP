import React from "react";
import API from "../API";

let emailInput = React.createRef();
let passwordInput = React.createRef();

function Signin(props) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    let id = emailInput.current.value;
    let pw = passwordInput.current.value;
    await API.getCustomer(id, pw).then((data) => {
      if (data.data.message) {
        alert("로그인 완료!");
      } else {
        alert("로그인 실패!!!!!");
      }
    });
    /*     if (email === "a@naver.com" && password === "1234") {
      props.login();
    } else alert("아이디 혹은 비밀번호가 일치 하지 않습니다."); */
  };

  return (
    <div className="signin">
      <form onSubmit={(e) => handleSubmit(e)} className="signin-form">
        <input
          type="email"
          name="email"
          id="signin-email"
          placeholder="ID@example.com"
          required
          ref={emailInput}
        />
        <input
          type="password"
          name="password"
          id="signin-password"
          placeholder="비밀번호를 입력해주세요."
          required
          ref={passwordInput}
        />
        <br />
        <button type="submit">테스트 로그인</button>
        {/* <button onClick={props.login}>로그인</button> */}
      </form>
    </div>
  );
}

export default Signin;

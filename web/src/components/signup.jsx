import React from "react";
import API from "../API";

let emailInput = React.createRef();
let passwordInput = React.createRef();
let passwordConfirmInput = React.createRef();
let companyCodeInput = React.createRef();

function Signup(props) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    let id = emailInput.current.value;
    let pw = passwordInput.current.value;
    let pwcheck = passwordConfirmInput.current.value;
    let companyCode = companyCodeInput.current.value;

    if (pw === pwcheck) {
      await API.addUser(id, pw, companyCode).then((data) => {
        if (data.data.message) {
          alert(`${data.data.message}님, 회원가입 완료되었습니다.`);
          props.toggleSignin();
        } else {
          alert("회원가입 실패!!!!");
        }
      });
    } else {
      alert("패스워드가 일치하지 않습니다.");
    }
  };

  return (
    <div className="signup">
      <h1>회원가입</h1>

      <form onSubmit={(e) => handleSubmit(e)} className="signup-form">
        <input
          type="email"
          name="email"
          id="signup-email"
          placeholder="ID@example.com"
          required
          ref={emailInput}
        />
        <input
          type="password"
          name="password"
          id="signup-password"
          placeholder="영문, 숫자, 특수문자 조합 8~20자"
          required
          ref={passwordInput}
        />
        <input
          type="password"
          name="password"
          id="signup-password-confirmation"
          placeholder="비밀번호를 한번 더 입력해주세요."
          required
          ref={passwordConfirmInput}
        />
        <input
          name="companyCode"
          id="signup-companycode"
          placeholder="업체 코드를 입력해주세요."
          required
          ref={companyCodeInput}
        />
        <br />
        <button type="submit" className="main-btn">
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Signup;

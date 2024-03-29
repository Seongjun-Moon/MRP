import React from "react";
import { connect } from "react-redux";

import store from "../redux/store";
import signin from "../redux/user/user.action";

import API from "../API";

import Cookies from "universal-cookie";
const cookies = new Cookies();

let emailInput, passwordInput;

function Signin(props) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    let id = emailInput.value;
    let pw = passwordInput.value;

    await API.getUser(id, pw).then(async (data) => {
      console.log(data);
      if (data.data.message) {
        store.dispatch(
          signin({
            isLoggedIn: true,
            companyType: data.data.companyType,
            companyCode: data.data.companyCode,
            userId: id,
          })
        );
        cookies.set("loggedIn", true);
        cookies.set("userCompanyType", data.data.companyType);
        cookies.set("userCompanyCode", data.data.companyCode);
        cookies.set("userId", id);

        // 체인코드
        const chaincodeLogin = await API.chaincodeConnect();
        console.log(chaincodeLogin);
        if (chaincodeLogin.data.message) {
          alert("블록체인 네트워크에 접속되었습니다.");
        } else {
          alert("블록체인 네트워크 접속에 실패하였습니다.");
        }
      } else {
        alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
        emailInput.value = "";
        passwordInput.value = "";
      }
    });
  };

  return (
    <div className="signin">
      <h1>로그인</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="signin-form">
        <input
          type="email"
          name="email"
          id="signin-email"
          placeholder="ID@example.com"
          required
          ref={(ref) => (emailInput = ref)}
          autoFocus
        />
        <input
          type="password"
          name="password"
          id="signin-password"
          placeholder="비밀번호를 입력해주세요."
          required
          ref={(ref) => (passwordInput = ref)}
        />
        <button type="submit" className="main-btn">
          로그인
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, null)(Signin);

import React from "react";
import API from "../API";

import { connect } from "react-redux";
function MyPage(props) {
  let inputChangePw, inputChangePwCheck;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let changePw = inputChangePw.value;
    let changePwCheck = inputChangePwCheck.value;
    let id = props.user.userId;
    if (changePw === changePwCheck) {
      await API.changeUserInfo(id, changePw).then((data) => {
        if (data.data.message) {
          alert("비밀번호 변경 완료!");
        } else {
          alert("비밀번호 변경 실패!");
        }
        inputChangePw.value = "";
        inputChangePwCheck.value = "";
      });
    } else {
      alert("비밀번호가 일치하지 않습니다.");
      inputChangePw.value = "";
      inputChangePwCheck.value = "";
    }
  };
  return (
    <article>
      <div>
        <h3>회원 정보 수정</h3>
        <form onSubmit={(e) => handleSubmit(e)} action="">
          <p>회원 아이디 : {props.user.userId}</p>
          <p>
            업체 코드 : {props.user.companyCode} ({props.user.companyType})
          </p>
          새 비밀번호
          <input
            type="password"
            required
            ref={(ref) => (inputChangePw = ref)}
            placeholder="영문, 숫자 포함 8~20자"
          />
          새 비밀번호 재입력
          <input
            type="password"
            required
            ref={(ref) => (inputChangePwCheck = ref)}
            placeholder="영문, 숫자 포함 8~20자"
          />
          <button type="submit" className="main-btn">
            비밀번호 변경
          </button>
        </form>
      </div>
    </article>
  );
}

const mapStateToProps = (state) => {
  return state;
};

//export default MyPage;
export default connect(mapStateToProps, null)(MyPage);

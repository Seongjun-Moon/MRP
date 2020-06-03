import React from "react";
import API from "../API";

function CompanyRegister(props) {
  let inputCompanyName,
    inputCompanyType,
    inputCompanyCode,
    inputCompanyUserId,
    inputCompanyUserPw,
    inputCompanyUserPwCheck;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let companyCode = inputCompanyCode.value;
    let companyName = inputCompanyName.value;
    let companyType = inputCompanyType.value;
    await API.createCompanyInfo(companyCode, companyName, companyType).then(
      (data) => {
        if (data.data.message) {
          alert("업체 등록 완료!");
        } else {
          alert("업체 등록 실패!!!!!");
        }
        inputCompanyCode.value = "";
        inputCompanyName.value = "";
        inputCompanyType.value = "";
      }
    );
  };

  const joinSubmit = async (e) => {
    e.preventDefault();
    let companyCode = inputCompanyCode.value;
    let id = inputCompanyUserId.value;
    let pw = inputCompanyUserPw.value;
    let pwCheck = inputCompanyUserPwCheck.value;
    if (pw === pwCheck) {
      await API.addUser(id, pw, companyCode).then((data) => {
        if (data.data.message) {
          alert("회원 등록 완료!");
        } else {
          alert("회원 등록 실패!!!!!");
        }
        inputCompanyCode.value = "";
        inputCompanyUserId.value = "";
        inputCompanyUserPw.value = "";
        inputCompanyUserPwCheck.value = "";
      });
    } else {
      alert("비밀번호가 일치하지 않습니다.");
      inputCompanyUserPw.value = "";
      inputCompanyUserPwCheck.value = "";
    }
  };

  return (
    <article className="company-register">
      <div className="company-register_company">
        <h3>업체 정보 등록</h3>
        <form onSubmit={(e) => handleSubmit(e)} action="">
          업체 코드
          <input
            id="company-code"
            required
            ref={(ref) => (inputCompanyCode = ref)}
            placeholder="ex) MANU-0123456789"
          />
          업체 이름
          <input
            id="company-name"
            required
            ref={(ref) => (inputCompanyName = ref)}
            placeholder="ex) (주)MRP제약"
          />
          업체 종류
          <select
            name="type"
            id="company-type"
            ref={(ref) => (inputCompanyType = ref)}
          >
            <option value="factory">제조업체</option>
            <option value="wholesale">도매업체</option>
            <option value="hospital">병원</option>
            <option value="pharmacy">약국</option>
          </select>
          <button type="submit" className="main-btn">
            업체 등록
          </button>
        </form>
      </div>

      <div className="company-register_user">
        <h3>업체 관리자 정보 등록</h3>

        <form onSubmit={(e) => joinSubmit(e)} action="">
          업체 코드
          <input
            type="text"
            required
            ref={(ref) => (inputCompanyCode = ref)}
            placeholder="ex) MANU-0123456789"
          />
          아이디
          <input
            type="email"
            required
            ref={(ref) => (inputCompanyUserId = ref)}
            placeholder="ex) mrp@mrp.com"
          />
          비밀번호
          <input
            type="password"
            required
            ref={(ref) => (inputCompanyUserPw = ref)}
            placeholder="영문, 숫자 포함 8~20자"
          />
          비밀번호 재입력
          <input
            type="password"
            required
            ref={(ref) => (inputCompanyUserPwCheck = ref)}
            placeholder="영문, 숫자 포함 8~20자"
          />
          <button type="submit" className="main-btn">
            업체 회원 등록
          </button>
        </form>
      </div>
    </article>
  );
}

export default CompanyRegister;

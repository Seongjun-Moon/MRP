import React from "react";
import API from "../API";

function CompanyRegister(props) {
  let inputCompanyName,
    inputCompanyType,
    inputCompanyCode,
    inputCompanyId,
    inputCompanyPw,
    inputCompanyPwCheck;

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
    let companyId = inputCompanyId.value;
    let companyPw = inputCompanyPw.value;
    let companyPwCheck = inputCompanyPwCheck.value;
    if (companyPw === companyPwCheck) {
      await API.createCompanyUserInfo(companyCode, companyId, companyPw).then(
        (data) => {
          if (data.data.message) {
            alert("회원 등록 완료!");
          } else {
            alert("회원 등록 실패!!!!!");
          }
          inputCompanyCode.value = "";
          inputCompanyId.value = "";
          inputCompanyPw.value = "";
          inputCompanyPwCheck.value = "";
        }
      );
    } else {
      alert("비밀번호가 일치하지 않습니다.");
      inputCompanyPw.value = "";
      inputCompanyPwCheck.value = "";
    }
  };

  return (
    <article className="medicine-register">
      <h3>업체 정보 등록</h3>

      <form onSubmit={(e) => handleSubmit(e)} action="">
        업체 코드
        <input
          id="company-code"
          required
          ref={(ref) => (inputCompanyCode = ref)}
        />
        업체 이름
        <input
          id="company-name"
          required
          ref={(ref) => (inputCompanyName = ref)}
        />
        <br />
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
        <br />
        <button type="submit" className="main-btn">
          업체 등록
        </button>
      </form>

      <h3>업체 회원 등록</h3>

      <form onSubmit={(e) => joinSubmit(e)} action="">
        업체 코드
        <input
          id="company-code"
          required
          ref={(ref) => (inputCompanyCode = ref)}
        />
        아이디
        <input id="company-id" required ref={(ref) => (inputCompanyId = ref)} />
        비밀번호
        <input
          type="password"
          id="company-pw"
          required
          ref={(ref) => (inputCompanyPw = ref)}
        />
        비밀번호 재입력
        <input
          type="password"
          id="company-pw"
          required
          ref={(ref) => (inputCompanyPwCheck = ref)}
        />
        <button type="submit" className="main-btn">
          업체 회원 등록
        </button>
      </form>
    </article>
  );
}

export default CompanyRegister;

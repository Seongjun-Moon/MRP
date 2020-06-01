import React from "react";

import { connect } from "react-redux";

import API from "../API";

function MedicineRegister(props) {
  let mediCode,
    companyCode,
    mediName,
    mediType,
    count,
    permissionDate,
    cancelDate;

  const createMedicineInfo = async (event) => {
    event.preventDefault();
    const result = await API.createMedicineInfo(
      mediCode.value,
      companyCode.value,
      mediName.value,
      mediType.value,
      count.value,
      permissionDate.value,
      cancelDate.value
    ).then((data) => data.data);

    result
      ? alert("의약품 정보가 등록되었습니다.")
      : alert("의약품 정보 등록에 실패했습니다.");

    mediCode.value = "";
    companyCode.value = "";
    mediName.value = "";
    mediType.value = "";
    count.value = "";
    permissionDate.value = "";
    cancelDate.value = "";
  };

  return (
    <article className="medicine-register">
      <h3>전문의약품 정보 등록</h3>
      <form action="" className="medicine-form" onSubmit={createMedicineInfo}>
        <label htmlFor="mediCode">의약품 표준코드</label>
        <input
          type="text"
          name=""
          id="mediCode"
          ref={(ref) => (mediCode = ref)}
          required
        />

        <label htmlFor="mediName">의약품명</label>
        <input
          type="text"
          name=""
          id="mediName"
          ref={(ref) => (mediName = ref)}
          required
        />

        <label htmlFor="companyCode">제조업체 코드</label>
        <input
          type="text"
          name=""
          id="companyCode"
          ref={(ref) => (companyCode = ref)}
          required
        />

        <label htmlFor="mediType">의약품 유형</label>
        <select name="" id="mediType" ref={(ref) => (mediType = ref)} required>
          <option value="전문의약품">전문 의약품</option>
        </select>

        <label htmlFor="count">제품 수량</label>
        <input
          type="number"
          name=""
          id="count"
          ref={(ref) => (count = ref)}
          required
        />

        <label htmlFor="permissionDate">품목 허가일자</label>
        <input
          type="date"
          name=""
          id="permissionDate"
          ref={(ref) => (permissionDate = ref)}
          required
        />

        <label htmlFor="cancelDate">취소일자</label>
        <input
          type="date"
          name=""
          id="cancelDate"
          ref={(ref) => (cancelDate = ref)}
          required
        />
        <button type="submit" className="main-btn">
          등록
        </button>
      </form>
    </article>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, null)(MedicineRegister);

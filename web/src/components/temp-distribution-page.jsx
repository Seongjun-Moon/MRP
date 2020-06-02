import React from "react";
import API from "../API";

import { connect } from "react-redux";
function TempDistributionPage(props) {
  let distSearchInput;
  const [distData, setDistData] = React.useState(null);

  React.useEffect(() => {
    if (props.medicine.mediCode) {
      getTempDistInfo(props.medicine.mediCode);
    }
  }, []);

  const getTempDistInfo = async (mediCode) => {
    const data = await API.getTempDistInfo(mediCode).then((data) => data.data);
    console.log(data);
    if (data) {
      data.tempDistInfo.map((info) => {
        switch (info.state) {
          case "input":
            info.state = "입고";
            break;
          case "output":
            info.state = "출고";
            break;
        }
      });
      setDistData(data.tempDistInfo);
    }
  };

  const handleSubmitBtn = (event) => {
    event.preventDefault();
    alert("확인 후 서버로 전송");
    // {companyCode: "", mediCode: ""}
  };

  return (
    <article className="temp-distribution">
      <h3>임시 유통 이력 조회</h3>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          getTempDistInfo(distSearchInput.value);
        }}
      >
        <input
          type="text"
          name="medi-search"
          className="medi-search"
          placeholder="의약품 코드로 검색"
          ref={(ref) => (distSearchInput = ref)}
        />
        <button className="main-btn search-btn" type="submit">
          검색
        </button>
      </form>

      {distData ? (
        <div className="temp-distribution-list">
          <table>
            <thead>
              <tr>
                <td>바코드 번호</td>
                <td>유통 등록 업체 코드</td>
                <td>대상 업체 코드</td>
                <td>상태</td>
                <td>등록 시간</td>
                <td>비고</td>
              </tr>
            </thead>
            <tbody>
              {distData.map((dist, index) => {
                return (
                  <tr key={dist.barcode}>
                    <td>{dist.barcode}</td>
                    <td>{dist.companyCode}</td>
                    <td>{dist.targetCompanyCode}</td>
                    <td>{dist.state}</td>
                    <td>{dist.createdAt}</td>
                    <td>비고</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button
            className="main-btn"
            onClick={(event) => handleSubmitBtn(event)}
          >
            확인
          </button>
        </div>
      ) : (
        <p>조회된 임시 유통 이력이 없습니다.</p>
      )}
    </article>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, null)(TempDistributionPage);

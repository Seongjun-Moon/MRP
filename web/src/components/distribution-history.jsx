import React from "react";
import API from "../API";

import { connect } from "react-redux";

// 바코드별 유통 이력
function DistributionHistory(props) {
  let distSearchInput;
  const [historyData, setHistoryData] = React.useState(null);
  const [barcode, setBarcode] = React.useState(null);
  const [mediName, setMediName] = React.useState(null);

  React.useEffect(() => {
    // data.map((info) => {
    //   switch (info.state) {
    //     case "input":
    //       info.state = "입고";
    //       break;
    //     case "output":
    //       info.state = "출고";
    //       break;
    //   }
    // });
    // setHistoryData(data);
  }, []);

  const getDistHistory = async (barcode) => {
    const mediName = await API.getMedicineName(barcode).then(
      (data) => data.data
    );
    const data = await API.getDistHistory(barcode).then((data) => data.data);

    console.log(data);
    console.log(mediName);

    if (mediName.message) setMediName(mediName.medicineData.mediName);
    setBarcode(barcode);
    setHistoryData(data.resultArr);
  };

  return (
    <article className="distribution">
      <h3>바코드별 유통 이력 조회</h3>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          getDistHistory(distSearchInput.value);
        }}
      >
        <input
          type="text"
          name="company-search"
          className="medi-search"
          placeholder="의약품 바코드로 검색"
          ref={(ref) => (distSearchInput = ref)}
        />
        <button className="main-btn search-btn" type="submit">
          검색
        </button>
      </form>

      {historyData ? (
        <div className="distribution-list">
          <h3>
            {mediName}: {barcode}
          </h3>
          <table>
            <thead>
              <tr>
                {/* <td>바코드 번호</td> */}
                <td>유통 등록 업체 코드</td>
                <td>대상 업체 코드</td>
                <td>상태</td>
                <td>등록 시간</td>
                <td>비고</td>
              </tr>
            </thead>
            <tbody>
              {historyData.map((history, index) => {
                return (
                  <tr key={index}>
                    {/* <td>{history.barcode}</td> */}
                    <td>{history.companyCode}</td>
                    <td>{history.targetCompanyCode}</td>
                    <td>{history.state}</td>
                    <td>{history.time}</td>
                    <td>{history.description ? history.description : null}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>조회된 유통 이력이 없습니다.</p>
      )}
    </article>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, null)(DistributionHistory);

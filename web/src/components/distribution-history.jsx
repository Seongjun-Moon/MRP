import React from "react";
import API from "../API";

import { connect } from "react-redux";

// Dummy Data
// 제조-유통 유통-유통 유통-병원
const data = [
  {
    barcode: "(01)8806920000104(21)12345678",
    companyCode: "MANU-0000000001",
    targetCompanyCode: "DIST-0000000002",
    state: "output",
    createdAt: "2020-05-02 12:23:21",
    description: "",
  },
  {
    barcode: "(01)8806920000104(21)12345678",
    companyCode: "DIST-0000000002",
    targetCompanyCode: "MANU-0000000001",
    state: "input",
    createdAt: "2020-05-03 19:02:19",
    description: "",
  },
  {
    barcode: "(01)8806920000104(21)12345678",
    companyCode: "DIST-0000000002",
    targetCompanyCode: "DIST-0000000003",
    state: "output",
    createdAt: "2020-05-05 15:23:01",
    description: "",
  },
  {
    barcode: "(01)8806920000104(21)12345678",
    companyCode: "DIST-0000000003",
    targetCompanyCode: "DIST-0000000002",
    state: "input",
    createdAt: "2020-05-07 10:23:28",
    description: "",
  },
  {
    barcode: "(01)8806920000104(21)12345678",
    companyCode: "DIST-0000000003",
    targetCompanyCode: "HOSP-0000000011",
    state: "output",
    createdAt: "2020-05-09 14:11:59",
    description: "",
  },
  {
    barcode: "(01)8806920000104(21)12345678",
    companyCode: "HOSP-0000000011",
    targetCompanyCode: "DIST-0000000003",
    state: "input",
    createdAt: "2020-05-10 12:20:12",
    description: "",
  },
];

// 바코드별 유통 이력
function DistributionHistory(props) {
  let distSearchInput;
  const [historyData, setHistoryData] = React.useState(null);
  const [barcode, setBarcode] = React.useState(null);
  const [mediName, setMediName] = React.useState("간포트점안액");

  React.useEffect(() => {
    data.map((info) => {
      switch (info.state) {
        case "input":
          info.state = "입고";
          break;
        case "output":
          info.state = "출고";
          break;
      }
    });
    setHistoryData(data);
    setBarcode(data[0].barcode);
  }, []);

  const getDistHistory = async (event, barcode) => {
    event.preventDefault();
    // const data = await API.getDistHistory(barcode).then((data) => data.data);

    // setDistData(data.tempDistInfo);
  };

  return (
    <article className="distribution">
      <h3>바코드별 유통 이력 조회</h3>

      <form onSubmit={(event) => getDistHistory(event, distSearchInput.value)}>
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
                    <td>{history.createdAt}</td>
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

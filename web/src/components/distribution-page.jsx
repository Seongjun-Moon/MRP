import React from "react";
import API from "../API";

import { connect } from "react-redux";

function DistributionPage(props) {
  let distSearchInput;
  const [distData, setDistData] = React.useState(null);
  const [barcodeData, setBarcodeData] = React.useState(null);
  const [distSearchValue, setDistSearchValue] = React.useState(null);

  React.useEffect(() => {
    console.log(props.medicine);
  }, []);

  const getDistLatestInfo = async (mediCode) => {
    setDistSearchValue(mediCode);
    const data = await API.getDistLatestInfo(mediCode).then(
      (data) => data.data
    );
    // medicode 빈값이면 안됨
    // console.log(data);
    console.log(data.resultArr);
    console.log(data.barcodeList);

    const combinedDistData = data.resultArr.map((dataObj, index) => {
      return (dataObj = Object.assign(dataObj, {
        barcode: data.barcodeList[index],
      }));
    });

    combinedDistData.map((info) => {
      switch (info.state) {
        case "input":
          info.state = "입고";
          break;
        case "output":
          info.state = "출고";
          break;
      }
    });

    console.log(combinedDistData);
    setDistData(combinedDistData);
    // setBarcodeData(data.barcodeList);
  };

  return (
    <article className="distribution">
      <h3>의약품별 유통 이력 조회</h3>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          getDistLatestInfo(distSearchInput.value);
        }}
      >
        <input
          type="text"
          name="company-search"
          className="medi-search"
          placeholder="의약품 코드로 검색"
          ref={(ref) => (distSearchInput = ref)}
          required
        />
        <button className="main-btn search-btn" type="submit">
          검색
        </button>
      </form>

      {distData ? (
        <div className="distribution-list">
          <h3>{distSearchValue}</h3>
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
                  <tr key={index}>
                    <td>{dist.barcode}</td>
                    <td>{dist.companyCode}</td>
                    <td>{dist.targetCompanyCode}</td>
                    <td>{dist.state}</td>
                    <td>{dist.time}</td>
                    <td>{dist.description}</td>
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

export default connect(mapStateToProps, null)(DistributionPage);

import React from "react";
import API from "../API";

import { connect } from "react-redux";

function DistributionPage(props) {
  let distSearchInput;
  const [distData, setDistData] = React.useState(null);

  React.useEffect(() => {
    console.log(props.medicine);
  }, []);

  const getDistInfo = async (event, mediCode) => {
    event.preventDefault();
    // const data = await API.getDistInfo(mediCode).then((data) => data.data);

    // setDistData(data.tempDistInfo);
  };

  return (
    <article className="distribution">
      <h3>유통 이력 조회</h3>

      <form onSubmit={(event) => getDistInfo(event, distSearchInput.value)}>
        <input
          type="text"
          name="company-search"
          className="medi-search"
          placeholder="의약품 코드로 검색"
          ref={(ref) => (distSearchInput = ref)}
        />
        <button className="main-btn search-btn" type="submit">
          검색
        </button>
      </form>

      {distData ? (
        <div className="distribution-list">
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

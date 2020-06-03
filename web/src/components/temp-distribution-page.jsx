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
    // data.getTargetName[0].company.companyName = targetCompanyName
    // data.tempDistInfo[0].company.companyName = companyName
    // data.tempDistInfo[0].medicine.mediName = mediName
    if (data && data.tempDistInfo.length > 0) {
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
      /*
       const combinedDistData = data.resultArr.map((dataObj, index) => {
      return (dataObj = Object.assign(dataObj, {
        barcode: data.barcodeList[index],
      }));
    });
    */

      const combinedTempDistInfo = data.tempDistInfo.map((dataObj, index) => {
        return (dataObj = Object.assign(dataObj, {
          targetCompanyName: data.getTargetName[index].company.companyName,
        }));
      });

      setDistData(combinedTempDistInfo);
    } else if (data && data.tempDistInfo.length === 0) {
      alert("해당 코드로 조회된 결과가 없습니다.");
    } else {
      alert("오류가 발생했습니다.");
    }
  };

  const handleSubmitBtn = async (event) => {
    event.preventDefault();
    alert("현재 유통 이력이 블록체인에 저장됩니다.");
    const data = await API.createDistInfo();
    console.log(data);
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
                <td>의약품 명</td>
                <td>바코드 번호</td>
                <td>대상 업체 명</td>
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
                    <td>{dist.medicine.mediName}</td>
                    <td>{dist.barcode}</td>
                    <td>{dist.targetCompanyName}</td>
                    <td>{dist.targetCompanyCode}</td>
                    <td>{dist.state}</td>
                    <td>{dist.createdAt.slice(0, 10)}</td>
                    <td>{dist.description ? dist.description : null}</td>
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

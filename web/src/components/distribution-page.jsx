import React from "react";
import API from "../API";

function DistributionPage(props) {
  /*   const [circuData, setCircuData] = React.useState([]);

  React.useEffect(() => {
    getCircuInfo();
  }, []);

  const getCircuInfo = async () => {
    const data = await API.getCircuInfo().then((data) => data.data);
    setCircuData(data);
  }; */

  const [mediData, setMediData] = React.useState([]);
  const [delData, setDelData] = React.useState([]);

  React.useEffect(() => {
    getMedicineInfo();
  }, []);

  const getMedicineInfo = async () => {
    const data = await API.getMedicineInfo().then((data) => data.data);
    setMediData(data.sort((a, b) => a.mediCode - b.mediCode));
  };

  const delStateInfo = (deleteCode) => {
    let dataArr = [...delData];
    if (dataArr.includes(deleteCode)) {
      dataArr = dataArr.filter((data) => data !== deleteCode);
    } else {
      dataArr.push(deleteCode);
    }
    setDelData(dataArr);
  };

  const deleteDistInfo = async (event, code) => {
    const answer = window.confirm("삭제하시겠습니까?");
    if (answer === true) {
      delStateInfo(code);
    } else {
      alert("취소했습니다.");
    }
  };

  return (
    <article className="medicine">
      <h3>유통 이력 조회</h3>
      <table>
        <thead>
          <tr>
            <td>의약품 코드</td>
            <td>업체 코드</td>
            <td>의약품 이름</td>
            <td>의약품 종류</td>
            <td>갯수</td>
            <td>허가 일자</td>
            <td>취소 일자</td>
            <td>오류 보고</td>
          </tr>
        </thead>
        <tbody>
          {mediData.map((medi) => {
            return (
              <tr key={medi.mediCode}>
                <td>{medi.mediCode}</td>
                <td>{medi.companyCode}</td>
                <td>{medi.mediName}</td>
                <td>{medi.mediType}</td>
                <td>{medi.count}</td>
                <td>{medi.permissionDate}</td>
                <td>{medi.cancelDate}</td>
                <td>
                  <button
                    className={
                      delData.includes(medi.mediCode)
                        ? "del-btn"
                        : "default-btn"
                    }
                    onClick={(event) => {
                      deleteDistInfo(event, medi.mediCode);
                    }}
                  >
                    {delData.includes(medi.mediCode) ? "삭제됨" : "삭제하기"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <h3>오류 데이터 목록</h3>
        <ul>
          {delData.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    </article>
  );
  /*   return (
    <div>
      <h3>여기는 유통 페이지</h3>
      <table>
        <thead>
          <tr>
            <td>순번</td>
            <td>바코드 번호</td>
            <td>업체 코드</td>
            <td>업체 코드</td>
            <td>시간</td>
          </tr>
        </thead>
        <tbody>
          {circuData.map((distribution, index) => {
            return (
              <tr key={distribution.distributionCode}>
                <td>{index}</td>
                <td>{distribution.barcodeNO}</td>
                <td>{distribution.companyCode1}</td>
                <td>{distribution.companyCode2}</td>
                <td>{distribution.editTime}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ); */
}

export default DistributionPage;

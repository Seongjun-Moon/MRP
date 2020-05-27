import React from "react";
import API from "../API";

let blockData = React.createRef();

function DistributionPage(props) {
  /*   const [circuData, setCircuData] = React.useState([]);

  React.useEffect(() => {
    getCircuInfo();
  }, []);

  const getCircuInfo = async () => {
    const data = await API.getCircuInfo().then((data) => data.data);
    setCircuData(data);
  }; */

  let checkBtn;

  const [mediData, setMediData] = React.useState([]);

  React.useEffect(() => {
    getMedicineInfo();
  }, []);

  const getMedicineInfo = async () => {
    const data = await API.getMedicineInfo().then((data) => data.data);
    setMediData(data.sort((a, b) => a.mediCode - b.mediCode));
  };

  ///////////////////////////////////////////

  const deleteDistributionInfo = async (event) => {
    let deleteCode = event.target.parentNode.parentNode.firstChild.firstChild;
    console.log(deleteCode);
    //const data = await API.deletedistributionInfo(deleteCode).then((data) => data.data);
  };

  return (
    <article className="medicine">
      <h3>의약품 목록 조회</h3>
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
          {mediData.map((medi, index) => {
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
                  <button onClick={(event) => deleteDistributionInfo(event)}>
                    X
                  </button>
                  {/* <input type="checkbox" name={medi.mediCode} /> */}
                </td>
              </tr>
            );
          })}
        </tbody>
        <div>
          <button type="submit">이력 저장</button>
        </div>
      </table>
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

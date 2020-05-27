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
    //delStateInfo();
  }, []);

  const getMedicineInfo = async () => {
    const data = await API.getMedicineInfo().then((data) => data.data);
    setMediData(data.sort((a, b) => a.mediCode - b.mediCode));
  };

  const delStateInfo = (deleteCode) => {
    let dataArr = delData;
    delData.push(deleteCode);
    console.log(delData);
    setDelData(dataArr);
  };

  ///////////////////////////////////////////

  /*   const deleteDistributionInfo = async (event) => {
    let deleteCode = event.target.parentNode.parentNode.firstChild.firstChild;
    console.log(deleteCode);
    const answer = window.confirm("삭제 하시겠습니까?");
    if (answer === true) {
      const data = await API.deletedistributionInfo(deleteCode).then((data) => {
        if (data.data.message) {
          alert("삭제 했습니다.");
        } else {
          alert("삭제 싪패했습니다.");
        }
      });
      console.log(deleteCode);
    } else {
      alert("취소했습니다.");
    }
  }; */

  const deleteDistributionInfo = async (event, code) => {
    // let deleteCode = event.target.parentNode.parentNode.firstChild.firstChild;
    console.log(code);
    const answer = window.confirm("삭제 하시겠습니까?");
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
                  <button
                    onClick={(event) =>
                      deleteDistributionInfo(event, medi.mediCode)
                    }
                  >
                    X
                  </button>
                  {/* <input type="checkbox" name={medi.mediCode} /> */}
                </td>
              </tr>
            );
          })}
        </tbody>
        <div>
          삭제 리스트
          {/* {JSON.stringify(delData)} */}
          {delData.map((del) => {
            console.log(del);
            return <p>{del}</p>;
          })}
        </div>
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

import React from "react";
import API from "../API";

function DistributionPage(props) {
  let distSearchInput;
  const [distData, setDistData] = React.useState([]);
  const [delData, setDelData] = React.useState([]);

  React.useEffect(() => {}, []);

  const getDistInfo = async (event, mediCode) => {
    event.preventDefault();
    const data = await API.getDistInfo(mediCode).then((data) => data.data);

    setDistData(data.tempDistInfo);
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
    <article className="distribution">
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
      <h3>유통 이력 조회</h3>
      <table>
        <thead>
          <tr>
            <td>바코드 번호</td>
            <td>유통 등록 업체 코드</td>
            <td>대상 업체 코드</td>
            <td>상태</td>
            <td>등록 시간</td>
            <td>확인 여부</td>
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
                <td>
                  <button
                    className={
                      delData.includes(dist.barcode) ? "del-btn" : "default-btn"
                    }
                    onClick={(event) => {
                      deleteDistInfo(event, dist.barcode);
                    }}
                  >
                    {delData.includes(dist.barcode) ? "삭제됨" : "삭제하기"}
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
          {circuData.map((dist, index) => {
            return (
              <tr key={dist.distCode}>
                <td>{index}</td>
                <td>{dist.barcode}</td>
                <td>{dist.companyCode}</td>
                <td>{dist.targetCompanyCode}</td>
                <td>{dist.createdAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ); */
}

export default DistributionPage;

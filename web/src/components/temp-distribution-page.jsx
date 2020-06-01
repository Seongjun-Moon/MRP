import React from "react";
import API from "../API";

function TempDistributionPage(props) {
  let distSearchInput;
  const [distData, setDistData] = React.useState(null);
  const [delData, setDelData] = React.useState([]);

  React.useEffect(() => {}, []);

  const getTempDistInfo = async (event, mediCode) => {
    event.preventDefault();
    const data = await API.getTempDistInfo(mediCode).then((data) => data.data);
    console.log(data);
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
  };

  //   const delStateInfo = (deleteCode) => {
  //     let dataArr = [...delData];
  //     if (dataArr.includes(deleteCode)) {
  //       dataArr = dataArr.filter((data) => data !== deleteCode);
  //     } else {
  //       dataArr.push(deleteCode);
  //     }

  //     setDelData(dataArr);
  //   };

  //   const deleteDistInfo = async (event, code) => {
  //     const answer = window.confirm("삭제하시겠습니까?");
  //     if (answer === true) {
  //       delStateInfo(code);
  //     } else {
  //       alert("취소했습니다.");
  //     }
  //   };

  const handleSubmitBtn = (event) => {
    event.preventDefault();
    alert("확인 후 서버로 전송");
    // {companyCode: "", mediCode: ""}
  };

  return (
    <article className="temp-distribution">
      <h3>임시 유통 이력 조회</h3>
      <p>
        // 해당 회사 (제조사, 유통사, 병원 등)에 해당하는 이력만 넘어와야함'ㅅ'
        //
      </p>

      <form onSubmit={(event) => getTempDistInfo(event, distSearchInput.value)}>
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
                    {/* <td>
                      <button
                        className={
                          delData.includes(dist.barcode)
                            ? "del-btn"
                            : "default-btn"
                        }
                        onClick={(event) => {
                          deleteDistInfo(event, dist.barcode);
                        }}
                      >
                        {delData.includes(dist.barcode) ? "삭제됨" : "삭제하기"}
                      </button>
                    </td> */}
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

          {/* <div>
            <h3>오류 데이터 목록</h3>
            <ul>
              {delData.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div> */}
        </div>
      ) : (
        <p>조회된 임시 유통 이력이 없습니다.</p>
      )}
    </article>
  );
}

export default TempDistributionPage;

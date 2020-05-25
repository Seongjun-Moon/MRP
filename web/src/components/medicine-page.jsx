import React from "react";
import API from "../API";

/* Data Type ///
cancelDate: "2020-05-20T00:00:00.000Z" 
companyCode: "1" 
count: 1        
createdAt: "2020-05-22T04:23:20.000Z"
deletedAt: null 
mediCode: "8806920000104" 
mediName: "간포트점안액" 
mediType: "전문의약품"
permissionDate: "2020-05-20T00:00:00.000Z" 
updatedAt:"2020-05-22T04:23:20.000Z" 
*/

function MedicinePage(props) {
  let mediCode,
    companyCode,
    mediName,
    mediType,
    count,
    permissionDate,
    cancelDate;

  const [mediData, setMediData] = React.useState([]);

  React.useEffect(() => {
    getMedicineInfo();
  }, []);

  const getMedicineInfo = async () => {
    const data = await API.getMedicineInfo().then((data) => data.data);
    setMediData(data);
  };

  const createMedicineInfo = async (event) => {
    event.preventDefault();
    const result = await API.createMedicineInfo(
      mediCode.value,
      companyCode.value,
      mediName.value,
      mediType.value,
      count.value,
      permissionDate.value,
      cancelDate.value
    ).then((data) => data.data);
    console.log(result);

    result
      ? alert("의약품 정보가 등록되었습니다.")
      : alert("의약품 정보 등록에 실패했습니다.");

    getMedicineInfo();
  };

  return (
    <>
      <article className="medicine">
        <h3>의약품 목록 조회</h3>
        <table>
          <thead>
            <tr>
              <td>순번</td>
              <td>의약품 코드</td>
              <td>업체 코드</td>
              <td>의약품 이름</td>
              <td>의약품 종류</td>
              <td>갯수</td>
              <td>허가 일자</td>
              <td>취소 일자</td>
            </tr>
          </thead>
          <tbody>
            {mediData.map((medi, index) => {
              return (
                <tr key={medi.mediCode}>
                  <td>{index}</td>
                  <td>{medi.mediCode}</td>
                  <td>{medi.companyCode}</td>
                  <td>{medi.mediName}</td>
                  <td>{medi.mediType}</td>
                  <td>{medi.count}</td>
                  <td>{medi.permissionDate}</td>
                  <td>{medi.cancelDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </article>
      <article>
        <h3>의약품 정보 등록</h3>
        <form action="" onSubmit={createMedicineInfo}>
          <label htmlFor="mediCode">의약품 표준코드</label>
          <input
            type="text"
            name=""
            id="mediCode"
            ref={(ref) => (mediCode = ref)}
            required
          />

          <label htmlFor="mediName">의약품명</label>
          <input
            type="text"
            name=""
            id="mediName"
            ref={(ref) => (mediName = ref)}
            required
          />

          <label htmlFor="companyCode">제조업체 코드</label>
          <input
            type="text"
            name=""
            id="companyCode"
            ref={(ref) => (companyCode = ref)}
            required
          />

          <label htmlFor="mediType">의약품 유형</label>
          <select
            name=""
            id="mediType"
            ref={(ref) => (mediType = ref)}
            required
          >
            <option value="의약품">전문 의약품</option>
          </select>

          <label htmlFor="count">제품 수량</label>
          <input
            type="number"
            name=""
            id="count"
            ref={(ref) => (count = ref)}
            required
          />

          <label htmlFor="permissionDate">품목 허가일자</label>
          <input
            type="date"
            name=""
            id="permissionDate"
            ref={(ref) => (permissionDate = ref)}
            required
          />

          <label htmlFor="cancelDate">취소일자</label>
          <input
            type="date"
            name=""
            id="cancelDate"
            ref={(ref) => (cancelDate = ref)}
            required
          />
          <button type="submit">등록</button>
        </form>
      </article>
    </>
  );
}

export default MedicinePage;

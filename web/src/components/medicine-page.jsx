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
  const [mediData, setMediData] = React.useState([]);

  React.useEffect(() => {
    getMedicineInfo();
  }, []);

  const getMedicineInfo = async () => {
    const data = await API.getMedicineInfo().then((data) => data.data);
    data.map((medi) => {
      medi.permissionDate = medi.permissionDate.slice(0, 10);
      medi.cancelDate = medi.cancelDate.slice(0, 10);
    });
    setMediData(data.sort((a, b) => a.mediCode - b.mediCode));
  };

  return (
    <article className="medicine-list">
      <h3>의약품 목록 조회</h3>
      <input type="text" placeholder="의약품명 검색" />
      <table className="medicine-list_table">
        <thead>
          <tr>
            <td className="mediCode">의약품 코드</td>
            <td className="companyCode">업체 코드</td>
            <td className="mediName">의약품 이름</td>
            <td className="mediType">의약품 종류</td>
            <td className="count">갯수</td>
            <td className="permissionDate">허가 일자</td>
            <td className="cancelDate">취소 일자</td>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </article>
  );
}

export default MedicinePage;

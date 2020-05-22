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
  React.useEffect(async () => {
    setMediData(await API.getMedicineInfo().then((data) => data.data));
  }, {});

  return (
    <div>
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
    </div>
  );
}

export default MedicinePage;

import React from "react";

function MedicinePage(props) {
  return (
    <div>
      <h3>여기는 의약품 페이지</h3>
      <table>
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
      </table>
    </div>
  );
}

export default MedicinePage;

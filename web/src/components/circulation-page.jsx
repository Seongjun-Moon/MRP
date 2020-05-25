import React from "react";
import API from "../API";

function CirculationPage(props) {
  const [circuData, setCircuData] = React.useState([]);

  React.useEffect(() => {
    getCircuInfo();
  }, []);

  const getCircuInfo = async () => {
    const data = await API.getCircuInfo().then((data) => data.data);
    setCircuData(data);
  };

  return (
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
          {circuData.map((circulation, index) => {
            return (
              <tr key={circulation.circulationCode}>
                <td>{index}</td>
                <td>{circulation.barcodeNO}</td>
                <td>{circulation.companyCode1}</td>
                <td>{circulation.companyCode2}</td>
                <td>{circulation.editTime}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CirculationPage;

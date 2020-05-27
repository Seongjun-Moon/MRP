import React from "react";
import API from "../API";
import Axios from "axios";

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

  /* 체인코드 사용변수(테스트용) */
  const barcodeInput = React.useRef();
  const companyIdInput = React.useRef();
  const targetIdInput = React.useRef();
  const stateInput = React.useRef();

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

  const connect = () => {
    Axios.get("http://localhost:9090/chaincode/connect")
      .then((Response) => console.log(Response))
      .catch((error) => {
        console.log(error);
      });
  };

  const showAll = () => {
    const sendParam = { mediCode: "8806587000202" };
    Axios.post("http://localhost:9090/chaincode/barcodeList", sendParam)
      .then((Response) => {
        const size = Object.keys(Response.data).length;
        const barcodeArray = [];
        for (let i = 0; i < size; i++) {
          barcodeArray.push(Response.data.barcodeList[i].barcodeName);
        }
        console.log(barcodeArray);
        console.log(Response.data.sendString);
        console.log(Response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const register = () => {
    const flag = window.confirm(
      `아래 정보로 입력하시겠습니까?\n표준코드 : ${barcodeInput.current.value}\n회사코드: ${companyIdInput.current.value}\n대상업체코드: ${targetIdInput.current.value}\n유통상태: ${stateInput.current.value}`
    );

    if (flag) {
      const sendParam = {
        barcode: barcodeInput.current.value,
        companyId: companyIdInput.current.value,
        targetId: targetIdInput.current.value,
        state: stateInput.current.value,
      };
      Axios.post("http://localhost:9090/chaincode/register", sendParam)
        .then((response) => {
          alert(response.data.msg);
          barcodeInput.current.value = "";
          companyIdInput.current.value = "";
          targetIdInput.current.value = "";
          stateInput.current.value = "입고";
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return;
    }
  };

  return (
    <section className="medicine">
      {/* MRP 블록체인 네트워크 연결 */}
      <button onClick={connect}>blockchain connect</button>
      {/* 모든 전문의약품 최신 유통상태 확인(world state) */}
      <button onClick={showAll}>showAll</button>
      <br />
      {/* 전문의약품 유통정보 신규등록(최초) */}
      <input placeholder="바코드 입력" ref={barcodeInput} />
      <input placeholder="업체코드(사용자)" ref={companyIdInput} />
      <input placeholder="업체코드(대상))" ref={targetIdInput} />
      <select ref={stateInput}>
        <option>입고</option>
        <option>출고</option>
        <option>반송</option>
      </select>
      <button onClick={register}>register</button>
      <article className="medicine-list">
        <h3>의약품 목록 조회</h3>
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
    </section>
  );
}

export default MedicinePage;

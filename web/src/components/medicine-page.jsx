import React from 'react';
import API from '../API';
import Axios from 'axios';

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
    setMediData(data.sort((a, b) => a.mediCode - b.mediCode));
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
      ? alert('의약품 정보가 등록되었습니다.')
      : alert('의약품 정보 등록에 실패했습니다.');

    mediCode.value = '';
    companyCode.value = '';
    mediName.value = '';
    mediType.value = '';
    count.value = '';
    permissionDate.value = '';
    cancelDate.value = '';
    getMedicineInfo();
  };

  const connect = () => {
    Axios.get('http://localhost:9090/chaincode/connect')
      .then((Response) => console.log(Response))
      .catch((error) => {
        console.log(error);
      });
  };

  const showAll = () => {
    const sendParam = { mediCode: '8806587000202' };
    Axios.post('http://localhost:9090/chaincode/barcodeList', sendParam)
      .then((Response) => {
        const size = Object.keys(Response.data).length;
        const barcodeArray = [];
        for (let i = 0; i < size; i++) {
          barcodeArray.push(Response.data.barcodeList[i].barcodeName);
        }
        console.log(barcodeArray);
      })
      .catch((error) => console.log(error));
    /* Axios.get('http://localhost:9090/chaincode/queryAll')
      .then((response) => {
        if (response.data.msg) {
          alert(response.data.msg);
        } else {
          let result = JSON.parse(response.data.allInfo);
          console.log(result);
        }
      })
      .catch((error) => {
        console.log(error);
      }); */
  };

  const register = () => {
    const flag = confirm(
      `아래 정보로 입력하시겠습니까?\n표준코드 : ${barcodeInput.current.value}\n회사코드: ${companyIdInput.current.value}\n대상업체코드: ${targetIdInput.current.value}\n유통상태: ${stateInput.current.value}`
    );

    if (flag) {
      const sendParam = {
        barcode: barcodeInput.current.value,
        companyId: companyIdInput.current.value,
        targetId: targetIdInput.current.value,
        state: stateInput.current.value,
      };
      Axios.post('http://localhost:9090/chaincode/register', sendParam)
        .then((response) => {
          alert(response.data.msg);
          barcodeInput.current.value = '';
          companyIdInput.current.value = '';
          targetIdInput.current.value = '';
          stateInput.current.value = '입고';
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return;
    }
  };

  return (
<<<<<<< HEAD
    <section className="medicine">
      {/* MRP 블록체인 네트워크 연결 */}
      <button onClick={connect} disabled>
        blockchain connect
      </button>
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

      <article>
        <h3>의약품 정보 등록</h3>
        <form action="" className="medicine-form" onSubmit={createMedicineInfo}>
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
          <button type="submit" className="main-btn">
            등록
          </button>
        </form>
      </article>
    </section>
=======
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
>>>>>>> d68a1946075d1f409f5ccce049387fe24c25f99a
  );
}

export default MedicinePage;

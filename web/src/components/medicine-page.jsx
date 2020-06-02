import React, { Component } from "react";
import API from "../API";
import Axios from "axios";
import DistributionPage from "../components/distribution-page";

import store from "../redux/store";
import senddata from "../redux/medicine/medicine.action";

import { connect } from "react-redux";

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
  let mediSearchInput;
  const [mediData, setMediData] = React.useState([]);
  const [searchedMediData, setSearchedMediData] = React.useState([]);

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

  const handleSearchSubmit = async (event) => {
    // onchange dropdown으로 구현하고 싶은데 장기적으로 한번에 의약품 데이터를 다 불러오지 않으므로, 서버에 쿼리 날리는 쪽으로 구현
    event.preventDefault();
    const data = await API.getSearchedMedicineInfo(mediSearchInput.value).then(
      (data) => data.data
    );

    setSearchedMediData(data.data);
  };

  const sendLink = (mediCode) => {
    alert(mediCode);
    store.dispatch(
      senddata({
        datadata: mediCode,
      })
    );
    window.location.replace("../../distribution");
  };

  const mediDataRender = () => {
    let renderData;
    searchedMediData.length > 0
      ? (renderData = searchedMediData)
      : (renderData = mediData);
    return renderData.map((medi) => {
      return (
        <tr key={medi.mediCode}>
          <td
            onClick={() => {
              sendLink(medi.mediCode);
            }}
          >
            {medi.mediCode}
          </td>
          <td>{medi.companyCode}</td>
          <td>{medi.mediName}</td>
          <td>{medi.mediType}</td>
          <td>{medi.count}</td>
          <td>{medi.permissionDate}</td>
          <td>{medi.cancelDate}</td>
        </tr>
      );
    });
  };

  return (
    <section className="medicine">
      <article className="medicine-list">
        <h3>의약품 목록 조회</h3>
        <form action="">
          <input
            type="text"
            className="search-input"
            name="medi-search"
            id="medi-search"
            placeholder="의약품명 검색"
            ref={(ref) => (mediSearchInput = ref)}
          />
          <button
            className="main-btn search-btn"
            type="submit"
            onClick={(event) => handleSearchSubmit(event)}
          >
            검색
          </button>
        </form>

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
          <tbody>{mediDataRender()}</tbody>
        </table>
      </article>
    </section>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, null)(MedicinePage);

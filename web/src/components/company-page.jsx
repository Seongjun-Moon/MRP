import React from "react";
import API from "../API";

function CompanyPage(props) {
  let companySearchInput;
  const [companyData, setCompanyData] = React.useState([]);

  React.useEffect(() => {
    getCompanyInfo();
  }, []);

  const getCompanyInfo = async () => {
    const data = await API.getCompanyInfo().then((data) => data.data);
    setCompanyData(data);
  };

  const handleSearchSubmit = async () => {
    alert(companySearchInput.value);
    // const data = await API.getSearchedMedicineInfo(mediSearchInput.value).then(
    //   (data) => data.data
    // );
    // setSearchedMediData(data);
  };

  return (
    <article className="company-list">
      <div>
        <h3>업체 목록 조회</h3>
        <form action="">
          <input
            type="text"
            name="company-search"
            id="company-search"
            placeholder="업체명 검색"
            ref={(ref) => (companySearchInput = ref)}
          />
          <button
            className="main-btn search-btn"
            type="submit"
            onClick={handleSearchSubmit}
          >
            검색
          </button>
        </form>
        <table>
          <thead>
            <tr>
              <td>업체 코드</td>
              <td>업체 이름</td>
              <td>업체 종류</td>
            </tr>
          </thead>
          <tbody>
            {companyData.map((company) => {
              return (
                <tr key={company.companyCode}>
                  <td>{company.companyCode}</td>
                  <td>{company.companyName}</td>
                  <td>{company.companyType}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </article>
  );
}

export default CompanyPage;

import React from "react";
import API from "../API";

function CompanyPage(props) {
  const [companyData, setCompanyData] = React.useState([]);

  React.useEffect(() => {
    getCompanyInfo();
  }, []);

  const getCompanyInfo = async () => {
    const data = await API.getCompanyInfo().then((data) => data.data);
    setCompanyData(data);
  };

  return (
    <div>
      <div>
        <h3>업체 목록 조회</h3>
        <input type="text" placeholder="업체명 검색" />

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
    </div>
  );
}

export default CompanyPage;

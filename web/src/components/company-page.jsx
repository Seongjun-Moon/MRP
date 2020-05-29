import React from "react";
import API from "../API";

function CompanyPage(props) {
  const [companyData, setCompanyData] = React.useState([]);

  React.useEffect(() => {
    getCompanyInfo();
  }, []);

  const getCompanyInfo = async () => {
    const data = await API.getCompanyInfo().then((data) => data.data);
    data.map((company) => {
      switch (company.companyType) {
        case "manufacturer":
          company.companyType = "제조사";
          break;
        case "distributor":
          company.companyType = "유통사";
          break;
        case "hospital":
          company.companyType = "병원";
          break;
        case "pharmacy":
          company.companyType = "약국";
          break;
        case "oversee":
          company.companyType = "심사평가원";
          break;
      }
    });
    setCompanyData(data);
  };

  return (
    <article className="company-list">
      <div>
        <h3>업체 목록 조회</h3>
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

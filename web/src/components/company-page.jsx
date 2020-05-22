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
      <h3>여기는 업체 페이지</h3>
      <table>
        <thead>
          <tr>
            <td>순번</td>
            <td>업체 코드</td>
            <td>업체 이름</td>
            <td>업체 종류</td>
          </tr>
        </thead>
        <tbody>
          {companyData.map((company, index) => {
            return (
              <tr key={company.companyCode}>
                <td>{index}</td>
                <td>{company.companyCode}</td>
                <td>{company.companyName}</td>
                <td>{company.companyType}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CompanyPage;

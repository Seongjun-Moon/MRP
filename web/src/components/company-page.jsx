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
  
  let inputCompanyName = React.createRef();
let inputCompanyType = React.createRef();
let inputCompanyCode = React.createRef();
  
   const handleSubmit = async (e) => {
    e.preventDefault();
    let companyCode = inputCompanyCode.current.value;
    let companyName = inputCompanyName.current.value;
    let companyType = inputCompanyType.current.value;
    //    alert(companyName + " " + companyType);
    await API.createCompanyInfo(companyCode, companyName, companyType).then(
      (data) => {
        if (data.data.message) {
          alert("업체 등록 완료!");
        } else {
          alert("업체 등록 실패!!!!!");
        }
      }
    );
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
              <form onSubmit={(e) => handleSubmit(e)} action="">
          업체 코드
          <input id="company-code" required ref={inputCompanyCode} />
          업체 이름
          <input id="company-name" required ref={inputCompanyName} />
          <br />
          업체 종류
          <select name="type" id="company-type" ref={inputCompanyType}>
            <option value="factory">제조업체</option>
            <option value="wholesale">도매업체</option>
            <option value="hospital">병원</option>
            <option value="pharmacy">약국</option>
          </select>
          <br />
          <button type="submit">업체 등록</button>
        </form>
      
    </div>
  );
}

export default CompanyPage;

import React from "react";
import API from "../API";

function UserPage(props) {
  const [userData, setUserData] = React.useState([]);

  React.useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const data = await API.getUserInfo().then((data) => data.data);
    setUserData(data.userInfo);
  };

  return (
    <div>
      <h3>유저 목록 조회</h3>
      <table>
        <thead>
          <tr>
            <td>아이디</td>
            <td>업체 코드</td>
            <td>업체 명</td>
            <td>업체 유형</td>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.companyCode}</td>
                <td>{user.company.companyName}</td>
                <td>{user.company.companyType}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserPage;

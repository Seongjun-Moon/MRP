import React from "react";
import API from "../API";

function UserPage(props) {
  let userSearchInput;
  const [userData, setUserData] = React.useState([]);

  React.useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const data = await API.getUserInfo().then((data) => data.data);
    data.userInfo.map((user) => {
      switch (user.company.companyType) {
        case "manufacturer":
          user.company.companyType = "제조사";
          break;
        case "distributor":
          user.company.companyType = "유통사";
          break;
        case "hospital":
          user.company.companyType = "병원";
          break;
        case "pharmacy":
          user.company.companyType = "약국";
          break;
        case "oversee":
          user.company.companyType = "심사평가원";
          break;
      }
    });
    setUserData(data.userInfo);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    alert("유저 검색!");
  };

  return (
    <article className="user">
      <form action="">
        <input
          type="text"
          className="search-input"
          name="user-search"
          id="user-search"
          placeholder="업체 코드로 유저 검색"
          ref={(ref) => (userSearchInput = ref)}
        />
        <button
          className="main-btn search-btn"
          type="submit"
          onClick={(event) => handleSearchSubmit(event)}
        >
          검색
        </button>
      </form>
      <h3>유저 목록 조회</h3>
      <div className="user-list">
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
    </article>
  );
}

export default UserPage;

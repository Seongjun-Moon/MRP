import React from "react";

function Signin(props) {
  return (
    <div className="signin">
      <form action="" className="signin-form">
        ID
        <input type="text" />
        PW
        <input type="password" />
        <button onClick={props.login}>로그인</button>
      </form>
    </div>
  );
}

export default Signin;

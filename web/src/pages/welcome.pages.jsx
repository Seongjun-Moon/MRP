import React from "react";
import Signin from "../components/signin";
import Signup from "../components/signup";

class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      sign: true,
    };
  }

  signupButton = () => {
    this.setState({
      sign: false,
    });
  };

  render() {
    return (
      <div className="welcome-container">
        <h1>MRP</h1>
        {this.state.sign ? (
          <>
            <Signin login={this.props.login} />
            <button onClick={this.signupButton}>회원가입</button>
          </>
        ) : (
          <Signup login={this.props.login} />
        )}
      </div>
    );
  }
}

export default Welcome;

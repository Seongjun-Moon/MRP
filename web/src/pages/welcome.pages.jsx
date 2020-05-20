import React from "react";
import Signin from "../components/signin";

class Welcome extends React.Component {
  render() {
    return (
      <div className="welcome-container">
        <h1>MRP</h1>
        <Signin login={this.props.login} />
      </div>
    );
  }
}

export default Welcome;

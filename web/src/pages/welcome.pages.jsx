import React from "react";
import Signin from "../components/signin";
import Signup from "../components/signup";
import Footer from "../components/footer";

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
      <section className="welcome">
        <header>MRP</header>
        <article className="login-container">
          {this.state.sign ? (
            <>
              <Signin login={this.props.login} />
              <button onClick={this.signupButton}>회원가입</button>
            </>
          ) : (
            <Signup login={this.props.login} />
          )}
        </article>
        <Footer />
      </section>
    );
  }
}

export default Welcome;

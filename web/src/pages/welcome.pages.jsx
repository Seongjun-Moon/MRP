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
      sign: !this.state.sign,
    });
  };

  render() {
    return (
      <section className="welcome">
        <header>MRP</header>
        <article className="login-container">
          {this.state.sign ? (
            <>
              <Signin />
              <button className="sub-btn" onClick={this.signupButton}>
                회원가입하기
              </button>
            </>
          ) : (
            <>
              <Signup />
              <button className="sub-btn" onClick={this.signupButton}>
                로그인하기
              </button>
            </>
          )}
        </article>
        <Footer />
      </section>
    );
  }
}

export default Welcome;

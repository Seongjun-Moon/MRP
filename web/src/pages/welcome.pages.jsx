import React from "react";
import Signin from "../components/signin";
import Signup from "../components/signup";
import Footer from "../components/footer";

// import { ReactComponent as Medicine } from "../assets/medicine.svg";

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
        <header>
          <h1>MRP</h1>
          <h3>블록체인 기반 전문의약품 유통 및 추적 서비스</h3>
        </header>
        <article className="login-container">
          {this.state.sign ? (
            <>
              <Signin />
              <button className="sub-btn" onClick={this.signupButton}>
                회원가입
              </button>
            </>
          ) : (
            <>
              <Signup toggleSignin={this.signupButton} />
              <button className="sub-btn" onClick={this.signupButton}>
                로그인
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

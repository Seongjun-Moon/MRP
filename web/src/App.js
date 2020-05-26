import React from "react";
import Welcome from "../src/pages/welcome.pages";
import Main from "./pages/main.pages";

function App() {
  const [isLoggedIn, setIsLoggedin] = React.useState(false);

  const login = () => {
    setIsLoggedin(!isLoggedIn);
  };

  return <div>{!isLoggedIn ? <Main /> : <Welcome login={login} />}</div>;
}

export default App;

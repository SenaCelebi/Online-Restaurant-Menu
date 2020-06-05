import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import LoginForm from "./LoginForm"

function App() {
  return (
    <div className="App">
      <h1>Login Form</h1>
      <LoginForm />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

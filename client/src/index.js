import React from "react";
import { render } from "react-dom";
import App from "./App";
import StateProvider from "./context/StateProvider";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");
render(
  <StateProvider>
    <App />
  </StateProvider>,
  rootElement
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppRoutes from "./appRoutes/AppRoutes";
import { Context } from "./context/context";
import { Helmet } from "react-helmet";
import {render} from 'react-snapshot'

render(
  <Context>
    <Helmet>
      <meta title="Sample Feedback Form"></meta>
      <meta name="description" content="getting description name "></meta>
    </Helmet>
    <AppRoutes />
  </Context>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

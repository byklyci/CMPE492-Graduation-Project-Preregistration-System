import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import TablePage from "./TablePage";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
import "antd/dist/antd.css";

ReactDOM.render(
  <Provider store={store}>
    <TablePage />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.register();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

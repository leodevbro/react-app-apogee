// How to generate single file (HTML with all the CSS/JS inside) from React project
// https://gist.github.com/leodevbro/9cefc7d6b880e42f29685fd9bac636bd

import React from "react";
import ReactDOM from "react-dom";

import "symbol-observable"; // to fix some strange redux warning

import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter as BroRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BroRouter>
        <App />
      </BroRouter>
    </Provider>
  </React.StrictMode>,
  document.querySelector(".rootoflanding01"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

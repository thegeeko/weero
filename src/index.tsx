import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";

import "./style/main.scss";
import "normalize.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

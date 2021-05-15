import React from "react";
import ReactDOM from "react-dom";
import { FirebaseAppProvider } from "reactfire";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";

import "./style/main.scss";
import "normalize.css";

const firebaseConfig = {
  apiKey: "AIzaSyAGazC8FjJ80NuoIP9YesxKOn6Z5GWqrnQ",
  authDomain: "weero-dev.firebaseapp.com",
  projectId: "weero-dev",
  storageBucket: "weero-dev.appspot.com",
  messagingSenderId: "600414118734",
  appId: "1:600414118734:web:f5ed34b839077f3a25b41f",
  measurementId: "G-7J5QHT8LRW",
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </BrowserRouter>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

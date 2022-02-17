import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import { BrowserRouter } from "react-router-dom";
import "firebase/compat/firestore";
import firebase from 'firebase/compat/app';
import firebaseConfig from "./FirebaseConfig/Config";

if (firebase.apps.length === 0)
 firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import { BrowserRouter } from "react-router-dom";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import firebaseConfig from "./FirebaseConfig/Config";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { cartReducer } from './reducers/cartReducer'

if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
const store = createStore(cartReducer, devToolsEnhancer());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>{" "}
    </Provider>{" "}
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

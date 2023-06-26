import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../src/styles/index.css";
import { StateProvider } from "./features/main/context/StateProvider.jsx";
import reducer, { initialState } from "./features/main/context/Reducer.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./i18n/config";

const root = ReactDOM.createRoot(document.getElementById("root")!);

// Only use StrictMode in development for better debugging
const AppComponent = import.meta.env.DEV ? (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
) : (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

root.render(AppComponent);

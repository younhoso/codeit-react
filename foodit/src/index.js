import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import LocaleContext from "./contexts/LocaleContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <LocaleContext.Provider value={'ko'}>
    <App />
  </LocaleContext.Provider>
);

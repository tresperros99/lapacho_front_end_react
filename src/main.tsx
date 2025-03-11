import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux/es/exports";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {/* <ThemeProvider theme={defaultTheme}> */}
    <CssBaseline />
    <React.StrictMode>
      <App />
    </React.StrictMode>
    {/* </ThemeProvider> */}
  </Provider>
);

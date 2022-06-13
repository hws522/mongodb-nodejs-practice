import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
const root = ReactDOM.createRoot(document.getElementById("root"));

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

root.render(
  <ThemeSwitcherProvider themeMap={themes} defaultTheme="light">
    <App />
  </ThemeSwitcherProvider>);
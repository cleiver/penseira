import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { createGlobalStyle, ThemeProvider } from "styled-components";
import { reset, themes } from "react95";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import Throw from "./pages/Throw";
import Nope from "./pages/Nope";

const ResetStyles = createGlobalStyle`
  ${reset}
  body {
    background-color: teal;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <ResetStyles />
    <ThemeProvider theme={themes.default}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/register" component={Register} />
          <Route path="/reset" component={Reset} />
          <Route path="/throw" component={Throw} />
          <Route path="*" component={Nope} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

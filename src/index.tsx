import * as React from "react";
import { render } from "react-dom";
import {
  Switch,
  HashRouter as Router,
  Redirect,
  Route,
} from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { Editor } from "./pages/editor";
import { History } from "./pages/history";

const GlobalStyle = createGlobalStyle`
  body*{
    box-sizing: border-box;
  }
`;
const Main = (
  <>
    <GlobalStyle />
    <Router>
      {/* exactは完全一致 exactとexact={true}は同じ意味 */}
      <Route exact path="/editor">
        <Editor />
      </Route>
      <Route exact path="/history">
        <History />
      </Route>
      <Redirect to="/editor" path="*" />
    </Router>
  </>
);

render(Main, document.getElementById("app"));

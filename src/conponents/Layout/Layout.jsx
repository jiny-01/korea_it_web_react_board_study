import React from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import Header from "../Header/Header";
import { mainContainer } from "./styles";
function Layout({ children }) {
  return (
    <div css={s.layout}>
      <Header />
      <div css={s.mainContainer}>{children}</div>
    </div>
  );
}

export default Layout;

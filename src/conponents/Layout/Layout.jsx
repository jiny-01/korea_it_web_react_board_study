import React from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import Header from "../Header/Header";
function Layout({ children }) {
  return (
    <div css={s.layout}>
      <Header />
      {children}
    </div>
  );
}

export default Layout;

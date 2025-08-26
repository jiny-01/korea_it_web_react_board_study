import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Write from "../../pages/Write/write";
import Board from "../../pages/Board/Board";
import AuthRouter from "../AuthRouter/AuthRouter";

function MainRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route path="/write" element={<Write />} />
        <Route path="/auth/*" element={<AuthRouter />} />
      </Routes>
    </>
  );
}

export default MainRouter;

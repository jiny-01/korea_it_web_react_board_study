import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Write from "../../pages/Write/write";
import Board from "../../pages/Board/Board";
import AuthRouter from "../AuthRouter/AuthRouter";
import ProtectedRoute from "../../conponents/ProtectedRoute/ProtectedRoute";

function MainRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<ProtectedRoute>
              <Board />
            </ProtectedRoute>} />
        <Route
          path="/write"
          element={
            <ProtectedRoute>
              <Write />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/*" element={<AuthRouter />} />
      </Routes>
    </>
  );
}

export default MainRouter;

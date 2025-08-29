import React from "react";
import Profile from "../../pages/Profile/Profile";
import { Routes, Route } from "react-router-dom";

function AccountRouter() {
  return (
    <>
      <Routes>
        <Route path="profile/:username" element={<Profile />}/>
      </Routes>
    </>
  );
}

export default AccountRouter;

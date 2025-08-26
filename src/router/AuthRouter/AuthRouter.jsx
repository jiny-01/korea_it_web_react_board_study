import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "../../pages/Signup/Signup";
import Signin from "../../pages/Signin/SIgnin";
import OAuth2 from "../../pages/OAuth2/OAuth2";
import OAuth2Signup from "../../pages/OAuth2Signup/OAuth2Signup";


function AuthRouter() {
  return (
		<>
			<Routes>
				<Route path="/signin" element={<Signin />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/oauth2" element={<OAuth2 />} />
				<Route path="/oauth2/signup" element={<OAuth2Signup />} />
			</Routes>
		</>
	);
}

export default AuthRouter;

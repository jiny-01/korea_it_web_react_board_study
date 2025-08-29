import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Write from "../../pages/Write/write";
import Board from "../../pages/Board/Board";
import AuthRouter from "../AuthRouter/AuthRouter";
import ProtectedRoute from "../../conponents/ProtectedRoute/ProtectedRoute";
import BoardDetail from "../../pages/BoardDetail/BoardDetail";
import BoardUpdate from "../../pages/BoardUpdate/BoardUpdate";
import AccountRouter from "../AccountRouter/AccountRouter";

function MainRouter() {
  return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/board"
					element={
						<ProtectedRoute>
							<Board />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/write"
					element={
						<ProtectedRoute>
							<Write />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/board/:boardId"
					element={
						<ProtectedRoute>
							<BoardDetail />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/board/update/:boardId"
					element={
						<ProtectedRoute>
							<BoardUpdate />
						</ProtectedRoute>
					}
				/>
				<Route path="/auth/*" element={<AuthRouter />} />
				<Route
					path="/account/*"
					element={
						<ProtectedRoute>
							<AccountRouter />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</>
	);
}

export default MainRouter;

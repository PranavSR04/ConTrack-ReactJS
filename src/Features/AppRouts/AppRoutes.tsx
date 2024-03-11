import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "../../Components/AuthContext/AuthContext";
import LoginHandler from "../Login/LoginHandler";
import App from "../../App";
import RevenueProjectionHandler from "../RevenueProjection/RevenueProjectionHandler";
import NavBarHandler from "../../Components/NavBar/NavBarHandler";
import SideBar from "../../Components/SideBar/SideBar";

const AppRoutes = () => {
	return (
		<div>
			<BrowserRouter>
				<AuthContext>
					<NavBarHandler />
					<SideBar />
					<Routes>
						<Route path="/" element={<Navigate to="/login" />} />
						<Route path="/login" element={<LoginHandler />}></Route>
						<Route path="/Dashboard" element={<></>}></Route>
						<Route path="/revenue" element={<RevenueProjectionHandler />}
						></Route>
					</Routes>
				</AuthContext>
			</BrowserRouter>
		</div>
	);
};

export default AppRoutes;

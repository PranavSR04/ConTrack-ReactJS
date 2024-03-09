import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import AuthContext, { Auth } from "../../Components/AuthContext/AuthContext";
import LoginHandler from "../Login/LoginHandler";
import App from "../../App";


const AppRoutes = () => {
	return (
		<div>
			<BrowserRouter>
				<AuthContext>
					<Routes>
						<Route path="/" element={<Navigate to="/login" />} />
						<Route path="/login" element={<LoginHandler />}></Route>
						<Route path="/Dashboard" element={<App />}></Route>
					</Routes>
				</AuthContext>
			</BrowserRouter>
		</div>
	);
};

export default AppRoutes;

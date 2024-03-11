import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "../../Components/AuthContext/AuthContext";
import LoginHandler from "../Login/LoginHandler";
import App from "../../App";
import RevenueProjectionHandler from "../RevenueProjection/RevenueProjectionHandler";
import NavBarHandler from "../../Components/NavBar/NavBarHandler";
import SideBar from "../../Components/SideBar/SideBar";
import FixedFeeHandler from "../ContractView/FixedFee/FixedFeeHandler";

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthContext>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginHandler />}></Route>
              <Route path="/Dashboard" element={<><NavBarHandler/><SideBar></SideBar></>}></Route>
			  <Route path="/fixedfee" element={<><NavBarHandler/><SideBar><FixedFeeHandler/></SideBar></>}></Route>
              <Route path="/revenue" element={<><NavBarHandler/><SideBar><RevenueProjectionHandler/></SideBar></>}></Route>
            </Routes>
        </AuthContext>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "../../Components/AuthContext/AuthContext";
import LoginHandler from "../Login/LoginHandler";
import App from "../../App";
import AllContractsHandler from "../AllContracts/AllContractsHandler";

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
			  <Route path="/home" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginHandler />}></Route>
              <Route path="/dashboard" element={<><NavBarHandler/><SideBar></SideBar></>}></Route>
			  <Route path="/contract" element={<><NavBarHandler/><SideBar><FixedFeeHandler/></SideBar></>}></Route>
              <Route path="/revenue" element={<><NavBarHandler/><SideBar><RevenueProjectionHandler/></SideBar></>}></Route>
			  <Route path="/allContracts" element={<><NavBarHandler/><SideBar><AllContractsHandler /></SideBar></>}></Route>
			  <Route path="/myContracts" element={<><NavBarHandler/><SideBar><AllContractsHandler /></SideBar></>}></Route>
					
            </Routes>
        </AuthContext>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;

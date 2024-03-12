import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "../../Components/AuthContext/AuthContext";
import LoginHandler from "../Login/LoginHandler";
import App from "../../App";
import AllContractsHandler from "../AllContracts/AllContractsHandler";

import RevenueProjectionHandler from "../RevenueProjection/RevenueProjectionHandler";
import NavBarHandler from "../../Components/NavBar/NavBarHandler";
import SideBar from "../../Components/SideBar/SideBar";
import AddMsaHandler from "../MSA/AddMsa/AddMsaHandler";

import FixedFeeHandler from "../ContractView/FixedFee/FixedFeeHandler";
import ListMsaHandler from "../MSA/ListMsa/ListMsaHandler";
import EditMsaHandler from "../MSA/EditMsa/EditMsaHandler";
import RenewMsaHandler from "../MSA/RenewMsa/RenewMsaHandler";

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
			  <Route path="/AllContracts" element={<><NavBarHandler/><SideBar><AllContractsHandler /></SideBar></>}></Route>
			  <Route path="/MyContracts" element={<><NavBarHandler/><SideBar><AllContractsHandler /></SideBar></>}></Route>
        <Route path="/MSA" element={<><NavBarHandler/><SideBar><ListMsaHandler/></SideBar></>}></Route>
				<Route path="/msa/add" element={<><NavBarHandler/><SideBar><AddMsaHandler/></SideBar></>}></Route>
				<Route path="/msa/edit/:msa_ref_id" element={<><NavBarHandler/><SideBar><EditMsaHandler/></SideBar></>}></Route>
				<Route path="/msa/renew/:msa_ref_id" element={<><NavBarHandler/><SideBar><RenewMsaHandler/></SideBar></>}></Route>
				
            </Routes>
        </AuthContext>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;

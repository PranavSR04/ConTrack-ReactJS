import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "../../Components/AuthContext/AuthContext";
import LoginHandler from "../Login/LoginHandler";
import App from "../../App";
import RevenueProjectionHandler from "../RevenueProjection/RevenueProjectionHandler";
import NavBarHandler from "../../Components/NavBar/NavBarHandler";
import SideBar from "../../Components/SideBar/SideBar";
import AddContract from "../AddContract/AddContract";
import AddContractHandler from "../AddContract/AddContractHandler";

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthContext>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginHandler />}></Route>
            <Route path="/Dashboard" element={<App />}></Route>
            <Route
              path="/revenue"
              element={<RevenueProjectionHandler />}
            ></Route>
            <Route
              path="/contract/add"
              element={
                <>
                  <NavBarHandler />
                  <SideBar>
                    <AddContract />
                  </SideBar>
                </>
              }
            ></Route>
          </Routes>
        </AuthContext>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;

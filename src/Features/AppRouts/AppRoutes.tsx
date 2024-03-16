import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import AuthContext from "../../Components/AuthContext/AuthContext";
import LoginHandler from "../Login/LoginHandler";
import ManageUsersHandler from "../ManageUsers/ManageUsersHandler";
import AllContractsHandler from "../AllContracts/AllContractsHandler";
import NavContext from "../../Components/NavContext/NavContext";
import RevenueProjectionHandler from "../RevenueProjection/RevenueProjectionHandler";
import NavBarHandler from "../../Components/NavBar/NavBarHandler";
import SideBar from "../../Components/SideBar/SideBar";
import AddContractHandler from "../AddContract/AddContractHandler";
import FixedFeeHandler from "../ContractView/FixedFee/FixedFeeHandler";
import Dashboard from "../Dashboard/Dashboard";
import ListMsaHandler from "../MSA/ListMsa/ListMsaHandler";
import EditMsaHandler from "../MSA/EditMsa/EditMsaHandler";
import RenewMsaHandler from "../MSA/RenewMsa/RenewMsaHandler";
import EditContractHandler from "../AddContract/EditContractHandler";
import BreadCrumbs from "../../Components/BreadCrumbs/Breadcrumbs";
import AddMsaHandler from "../MSA/AddMsa/AddMsaHandler";

const AppRoutes = () => {
  const ROLE_ID = parseInt(localStorage.getItem("role_id") || "0", 10);

  return (
    <div>
      <BrowserRouter>
        <AuthContext>
          <NavContext>
            <BreadCrumbs />
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/home" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginHandler />} />
              <Route
                path="/dashboard"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <Dashboard />
                    </SideBar>
                  </>
                }
              />
              <Route
                path="/contract"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <FixedFeeHandler />
                    </SideBar>
                  </>
                }
              />
              <Route
                path="/revenue"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <RevenueProjectionHandler />
                    </SideBar>
                  </>
                }
              />
              {ROLE_ID === 1 ? (
                <Route
                  path="/manageUser"
                  element={
                    <>
                      <NavBarHandler />
                      <SideBar>
                        <ManageUsersHandler />
                      </SideBar>
                    </>
                  }
                />
              ) : (
                <Route path="/manageUser" element={<h1>403 Page</h1>} />
              )}
              <Route
                path="/allContracts"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <AllContractsHandler />
                    </SideBar>
                  </>
                }
              />
              <Route
                path="/myContracts"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <AllContractsHandler />
                    </SideBar>
                  </>
                }
              />
              {/* <Route
                path="/addContract"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <AddContractHandler />
                    </SideBar>
                  </>
                }
              /> */}

              <Route
                path="/allContracts/addContract"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <AddContractHandler />
                    </SideBar>
                  </>
                }
              />
              <Route
                path="/myContracts/addContract"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <AddContractHandler />
                    </SideBar>
                  </>
                }
              />
              <Route
                path="/MSA"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <ListMsaHandler />
                    </SideBar>
                  </>
                }
              />
              <Route
                path="/msa/add"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <AddMsaHandler />
                    </SideBar>
                  </>
                }
              />
              <Route
                path="/msa/edit/:msa_ref_id"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <EditMsaHandler />
                    </SideBar>
                  </>
                }
              />
              <Route
                path="/msa/renew/:msa_ref_id"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <RenewMsaHandler />
                    </SideBar>
                  </>
                }
              />

              <Route
                path="/editContract"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <EditContractHandler />
                    </SideBar>
                  </>
                }
              />
            </Routes>
          </NavContext>
        </AuthContext>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;

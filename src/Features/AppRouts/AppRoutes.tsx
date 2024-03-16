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
import { SignInButton } from "../Login/AzureSignin";
// import SignInButton from "../../Features/Login/AzureSignin"
import AccessDenied from "../../Components/AccessDenied/AccessDenied";
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
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/home" element={<Navigate to="/login" />} />
              <Route path="/msauth" element={<SignInButton />} />

              <Route path="/login" element={<LoginHandler />}></Route>
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
              ></Route>
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
              ></Route>
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
              ></Route>

              {ROLE_ID === 1 || ROLE_ID == undefined ? (
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
                ></Route>
              ) : (
                <Route
                  path="/manageUser"
                  element={
                    <>
                      <AccessDenied />
                    </>
                  }
                />
              )}
              {/* <Route path="/manageUser" element={<><NavBarHandler/><SideBar><ManageUsersHandler/></SideBar></>}></Route> */}

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
              ></Route>
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
              ></Route>
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
              ></Route>
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
              ></Route>
              <Route
                path="/msa/edit"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <EditMsaHandler />
                    </SideBar>
                  </>
                }
              ></Route>
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
              ></Route>
              <Route
                path="/addContract"
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

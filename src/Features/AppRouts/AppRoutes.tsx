import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import AuthContext, { Auth } from "../../Components/AuthContext/AuthContext";
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
import IndividualContractHandler from "../IndividualContract/IndividualContractHandler";

const AppRoutes = () => {
  const { roleId } = useContext(Auth);
  // const ROLE_ID = roleId;

  console.log("ROLE ID from AUTH CONTEXT:", typeof roleId, roleId);
  const ROLE_ID = parseInt(localStorage.getItem("role_id") || "0", 10);

  return (
    <div>
      <BrowserRouter>
        <AuthContext>
          <NavContext>
            <Routes>
              <Route path="/" element={<Navigate to="/Login" />} />
              <Route path="/Home" element={<Navigate to="/Login" />} />
              <Route path="/MS Auth" element={<SignInButton />} />
              <Route path="/Home" element={<Navigate to="/Login" />} />
              <Route path="/MS Auth" element={<SignInButton />} />
              <Route path="/Login" element={<LoginHandler />}></Route>
              <Route
                path="/Dashboard"
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
                path="/Dashboard/:contract_ref_id"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <IndividualContractHandler />
                    </SideBar>
                  </>
                }
              />
              <Route
                path="/Dashboard/:contract_ref_id/Edit Contract"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <EditContractHandler />
                    </SideBar>
                  </>
                }
              />
              <Route
                path="/Revenue"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <RevenueProjectionHandler />
                    </SideBar>
                  </>
                }
              ></Route>

              { ROLE_ID===1 && <Route path="/ManageUser" element={<><NavBarHandler/><SideBar><ManageUsersHandler/></SideBar></>}></Route>}

              <Route
                path="/AllContracts"
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
                path="/MyContracts"
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
                path="/MSA Overview"
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
                path="/MSA Overview/Add MSA"
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
                path="/MSA Overview/Edit MSA"
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
                path="/MSA Overview/Renew MSA/"
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
                path="/AllContracts/Add Contract"
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
                path="/AllContracts/Edit Contract"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <EditContractHandler />
                    </SideBar>
                  </>
                }
              />
              <Route
                path="/AllContracts/:contract_ref_id"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <IndividualContractHandler />
                    </SideBar>
                  </>
                }
              ></Route>
              <Route
                path="/MyContracts/:contract_ref_id"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <IndividualContractHandler />
                    </SideBar>
                  </>
                }
              ></Route>
              <Route
                path="/Revenue/:contract_ref_id"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <IndividualContractHandler />
                    </SideBar>
                  </>
                }
              ></Route>

              <Route
                path="/MyContracts/Edit Contract"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <EditContractHandler />
                    </SideBar>
                  </>
                }
              />
              <Route
                path="/MyContracts/Add Contract"
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
                path="/MSA Overview/Edit MSA/:msa_ref_id"
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
                path="/MSA Overview/Renew MSA/:msa_ref_id"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <RenewMsaHandler />
                    </SideBar>
                  </>
                }
              />
              {/* <Route
                path="/MSA Overview/:contract_ref_id/*"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <IndividualContractHandler />
                    </SideBar>
                    <Outlet />
                  </>
                }
              /> */}

              <Route
                path="/Edit Contract"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <EditContractHandler />
                    </SideBar>
                  </>
                }
              ></Route>
              <Route
                path="/Contract"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <IndividualContractHandler />
                    </SideBar>
                  </>
                }
              ></Route>
              <Route
                path="/AllContracts/:contract_ref_id/Edit Contract"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <EditContractHandler />
                    </SideBar>
                  </>
                }
              ></Route>
              <Route
                path="/MyContracts/:contract_ref_id/Edit Contract"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <EditContractHandler />
                    </SideBar>
                  </>
                }
              ></Route>
              <Route
                path="/MSA Overview/:contract_ref_id/Edit Contract"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <EditContractHandler />
                    </SideBar>
                  </>
                }
              ></Route>
              <Route
                path="/AllContracts/:contract_ref_id"
                element={
                  <>
                    <NavBarHandler />
                    <SideBar>
                      <EditContractHandler />
                    </SideBar>
                  </>
                }
              ></Route>
            </Routes>
          </NavContext>
        </AuthContext>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;

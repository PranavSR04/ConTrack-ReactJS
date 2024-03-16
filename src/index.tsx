import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppRoutes from "./Features/AppRouts/AppRoutes";
import "./App.css";
import { MsalProvider } from "@azure/msal-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { msalConfig } from "./Config/authConfig";
import { PublicClientApplication } from "@azure/msal-browser";

const msalInstance = new PublicClientApplication(msalConfig);
const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<MsalProvider instance={msalInstance}>
		<AppRoutes />
	</MsalProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

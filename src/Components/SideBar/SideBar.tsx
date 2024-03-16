import React, { useContext, useState } from "react";
import {
	FaBars,
	FaFileAlt,
	FaCopy,
	FaRegChartBar,
	FaUserCog,
	FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styles from "./SideBar.module.css";
import { SideBarPropType } from "./types";
import { Auth } from "../../Components/AuthContext/AuthContext";

const SideBar = ({ children }: SideBarPropType) => {
	const { logout } = useContext(Auth);
	const access_token = localStorage.getItem("access_token");
	const role_id = parseInt(localStorage.getItem("role_id") || "0", 10);
	console.log("role_id from local storage", role_id);
	const [isActiveIndex, setIsActiveIndex] = useState<number>();
	const commonSideItems = [
		{ path: "/dashboard", name: "Dashboard", icon: <FaBars /> },
		{ path: "/msa", name: "MSA", icon: <FaFileAlt /> },
		{ path: "/AllContracts", name: "Contracts", icon: <FaCopy /> },
		{ path: "/MyContracts", name: "MyContracts", icon: <FaFileAlt /> },
		{ path: "/revenue", name: "Revenue", icon: <FaRegChartBar /> },
	];

	const superadminSideItem = {
		path: "/ManageUser",
		name: "ManageUser",
		icon: <FaUserCog />,
	};

	const sideBarItem =
		role_id === 1 ? [...commonSideItems, superadminSideItem] : commonSideItems;
	const onClickActive = (index: number) => {
		setIsActiveIndex(index);
	};
	return (
		<div className={styles.container}>
			<div className={styles.container_sidebar}>
				{sideBarItem.map((item, index) => (
					<NavLink
						to={item.path}
						key={index}
						className={`${
							isActiveIndex === index ? styles.isactive : styles.not_active
						}`}
						onClick={() => onClickActive(index)}
					>
						<div className={styles.container_sidebar_icon}>{item.icon}</div>
						<div className={styles.container_sidebar_link_text}>
							{item.name}
						</div>
					</NavLink>
				))}
				<div className={styles.container_sidebar_logout}>
					<NavLink  
						to="/"
						className={styles.container_sidebar_logout_link}
						onClick={logout}
					>
						<div className={styles.container_sidebar_icon}>
							<FaSignOutAlt />
						</div>
						<div className={styles.container_sidebar_logout_link_text}>
							Logout
						</div>
					</NavLink>
				</div>
			</div>
			<div className={styles.container_outsideSideBar}>{children}</div>
		</div>
	);
};

export default SideBar;

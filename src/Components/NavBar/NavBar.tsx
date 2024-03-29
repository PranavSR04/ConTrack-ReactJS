import React, { useContext } from "react";
import { Nav, NavItem, NavbarBrand, NavbarText } from "react-bootstrap";
import styles from "./NavBar.module.css";
import { Avatar, Badge } from "antd";
import { IoMdNotifications } from "react-icons/io";
import logo from "../../img/Subtract.png";
import { NavBarPropType } from "./types";
import { NavContexts } from "../NavContext/NavContext";
import NotificationListHandler from "../NotificationList/NotificationListHandler";


const NavBar = ({username}:NavBarPropType) => {
	const{showDrawer}=useContext(NavContexts);
    const{activeNotificationCount}=useContext(NavContexts);
	console.log("notification count",activeNotificationCount);
	const currentUser = JSON.parse(localStorage.getItem("username")||"" );

	return (
		<>
			<Nav className={styles.navbar}>
				<NavbarBrand>
					<img src={logo} alt="contrack logo" className={styles.logo} />
					ConTrack
				</NavbarBrand>
				<NavItem>
					<a className={styles.notification} >
						<Badge count={activeNotificationCount}  overflowCount={30} showZero={false} offset={[4, 10]} classNames={{ indicator: styles.notificationCounter }} data-testid="bell-icon">
							<Avatar shape="square"  size={30} > <IoMdNotifications size={30} onClick={showDrawer} /></Avatar>
						</Badge>
					</a>
					<NotificationListHandler/>
					<NavbarText>{currentUser}</NavbarText>
						{/* {designation && (
							<NavbarText className={styles.designation}>{designation}</NavbarText>
						)} */}
				</NavItem>
			</Nav>
		</>
	);
};

export default NavBar;

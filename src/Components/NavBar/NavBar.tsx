import React, { useContext } from "react";
import { Nav, NavItem, NavbarBrand, NavbarText } from "react-bootstrap";
import styles from "./NavBar.module.css";
import { Avatar, Badge, Button } from "antd";
import { IoMdNotifications } from "react-icons/io";
import logo from "../../img/Subtract.png";
import { NavBarPropType } from "./types";
import { NavCon } from "../NavContext/NavContext";
import NotificationListHandler from "../NotificationList/NotificationListHandler";

const NavBar = ({username}:NavBarPropType) => {
	const{showDrawer}=useContext(NavCon);
    const{activeNotificationCount}=useContext(NavCon);

	return (
		<>
			<Nav className={styles.navbar}>
				<NavbarBrand href="#dashboard">
					<img src={logo} alt="contrack logo" className={styles.logo} />
					ConTrack
				</NavbarBrand>
				<NavItem>
					<a className={styles.notification} >
						<Badge count={activeNotificationCount}  overflowCount={30} showZero={false} offset={[4, 10]} classNames={{ indicator: styles.notificationCounter }}>
							<Avatar shape="square"  size={30}> <IoMdNotifications size={30} onClick={showDrawer} /></Avatar>
						</Badge>
					</a>
					<NotificationListHandler/>
					<NavbarText>{username}</NavbarText>
					<NavbarText className={styles.designation}>
						, Vice President
					</NavbarText>
				</NavItem>
			</Nav>
		</>
	);
};

export default NavBar;

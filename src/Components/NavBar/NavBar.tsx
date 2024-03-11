import React from "react";
import { Nav, NavItem, NavbarBrand, NavbarText } from "react-bootstrap";
import styles from "./NavBar.module.css";
import { Avatar, Badge } from "antd";
import { IoMdNotifications } from "react-icons/io";
import logo from "../../img/Subtract.png";
import { NavBarPropType } from "./types";

const NavBar = ({ username }: NavBarPropType) => {
	return (
		<>
			<Nav className={styles.navbar}>
				<NavbarBrand href="#dashboard">
					<img src={logo} alt="contrack logo" className={styles.logo} />
					ConTrack
				</NavbarBrand>
				<NavItem>
					<a href="#notification" className={styles.notification}>
						<Badge
							count={5}
							overflowCount={30}
							showZero={false}
							offset={[4, 10]}
							classNames={{ indicator: styles.notificationCounter }}
						>
							<Avatar shape="square" size={30}>
								{" "}
								<IoMdNotifications size={30} />
							</Avatar>
						</Badge>
					</a>
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

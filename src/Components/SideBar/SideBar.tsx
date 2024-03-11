import React ,{useState}from 'react'
import {FaBars,FaFileAlt,FaCopy,FaRegChartBar,FaUserCog,FaSignOutAlt} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import styles from './SideBar.module.css'
import { SideBarPropType } from './types';

  const SideBar = ({children}:SideBarPropType) => {
  const[isActiveIndex,setIsActiveIndex]=useState<number>();
  const sideBarItem = 
    [
      { path: '/', name: 'Dashboard', icon: <FaBars /> },
      { path: '/msa', name: 'MSA', icon: <FaFileAlt /> },
      { path: '/Contracts', name: 'Contracts', icon: <FaCopy /> },
      { path: '/mycontracts', name: 'MyContracts', icon: <FaFileAlt /> },
      { path: '/revenue', name: 'Revenue', icon: <FaRegChartBar /> },
      { path: '/ManageUser', name: 'ManageUser', icon: <FaUserCog /> }
    ];
  const onClickActive=(index:number)=>
  {
      setIsActiveIndex(index);
  }
  return (
    <div className={styles.container}>
      <div className={styles.container_sidebar}>
              {
                  sideBarItem.map((item, index)=>
                  (
                      <NavLink to={item.path} key={index} className={`${isActiveIndex===index?styles.isactive:styles.not_active}`} onClick={()=>onClickActive(index)}>
                          <div className={styles.container_sidebar_icon}>{item.icon}</div>
                          <div className={styles.container_sidebar_link_text}>{item.name}</div>
                      </NavLink>
                  ))
              }
              <div className={styles.container_sidebar_logout}>
                <NavLink to="/home" className={styles.container_sidebar_logout_link}>
                  <div className={styles.container_sidebar_icon}><FaSignOutAlt /></div>
                  <div className={styles.container_sidebar_logout_link_text}>Logout</div>
                </NavLink>
              </div>
      </div>
      <div className={styles.container_outsideSideBar}>
        {children}
      </div>
    </div>
  )
}

export default SideBar

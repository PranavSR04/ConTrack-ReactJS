import React, { useContext, useEffect, useState } from "react";
import { NotificationProps, NotificationType } from "./types";
import styles from "./Notification.module.css";
import { Navigate, useLocation, useNavigate } from "react-router";
import { NavContexts } from "../NavContext/NavContext";

const Notification = ({
  notification,
  difference,
  stylenames,
}: NotificationProps) => {
  console.log(stylenames);
  const { onClose } = useContext(NavContexts);
  const navigate = useNavigate();
  const [actionStyle, setActionStyle] = useState<string>("");
  const [cardStyle, setCardStyle] = useState<string>("");
  const location = useLocation();
  const rowClickHandler = (notification: NotificationType) => {
    const isFromMSAOverview = location.pathname.includes("/MSA Overview");
    const isFromAllContracts = location.pathname.includes("/AllContracts");
    const isFromMyContracts = location.pathname.includes("/MyContracts");
    const isFromDashboard = location.pathname.includes("/Dashboard");
    const isFromRevenue = location.pathname.includes("/Revenue");
    const isFromManageUser = location.pathname.includes("/Manage User");
    console.log(notification);
    if (notification.contract_id) {
      onClose();
      navigate(`/AllContracts/${notification.contract_ref_id}`);  
    
    if (isFromMSAOverview) {
      onClose();
      navigate(`/MSA Overview/${notification.contract_ref_id}`, {
        state: { id: notification.contract_id },
      });
    } else if (isFromAllContracts) {
      onClose();
      navigate(`/AllContracts/${notification.contract_ref_id}`, {
        state: { id: notification.contract_id },
      });
    } else if (isFromDashboard) {
      onClose();
      navigate(`/Dashboard/${notification.contract_ref_id}`, {
        state: { id: notification.contract_id },
      });
    } else if (isFromMyContracts) {
      onClose();
      navigate(`/MyContracts/${notification.contract_ref_id}`, {
        state: { id: notification.contract_id },
      });
    } else if (isFromRevenue) {
      onClose();
      navigate(`/Revenue/${notification.contract_ref_id}`, {
        state: { id: notification.contract_id },
      });
    } else if (isFromManageUser) {
      onClose();
      navigate(`/Manage User/${notification.contract_ref_id}`, {
        state: { id: notification.contract_id },
      });
    } else {
      onClose();
      navigate(`/MSA Overview`)
    }}
    else{
      onClose();
      navigate('/MSA Overview')
    }
  
  
  // if (!notification.msa_id) {
  //   onClose();
  //   navigate("/MSA Overview");
  // } else {
  //   onClose();
  //   navigate(`/AllContracts/${notification.contract_ref_id}`, {
  //     state: { id: notification.contract_id },
  //   });
  // }
};
  useEffect(() => {
    if (notification.action.includes("Added")) {
      setActionStyle(`${stylenames}added`);
      console.log("this is new style", actionStyle);
    } else if (notification.action === "Edited") {
      setActionStyle(`${stylenames}edited`);
    } else if (notification.action === "Expiring") {
      setActionStyle(`${stylenames}expiring`);
    } else if (notification.action === "Expired") {
      setActionStyle(`${stylenames}expired`);
    } else if (notification.action === "Renewed") {
      setActionStyle(`${stylenames}renewed`);
    }
    setCardStyle(`${stylenames}cardStyle_right`)
    console.log(`${stylenames}cardStyle_right`)
  }, [notification.action, stylenames]);
  return (
    <div
    className={styles[stylenames]}
      onClick={() => rowClickHandler(notification)}
    >
    <div className={styles[actionStyle]}>
        <p>{notification.action.toUpperCase()}</p>
      </div>
      
      <div className={styles[`${stylenames}cardStyle_right`]}>
        <b>
          {notification.contract_ref_id
            ? `  ${notification.contract_ref_id}: Contract ${notification.action} for ${notification.client_name}`
            : `${notification.msa_ref_id}: Msa ${notification.action} for ${notification.client_name}`}
        </b>
      </div>
      <div className={styles.difference}>
        <p>
          <b>{difference}</b>
        </p>
      </div>
    </div>
  );
};

export default Notification;

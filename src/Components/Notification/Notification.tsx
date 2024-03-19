import React, { useContext, useEffect, useState } from "react";
import { NotificationProps, NotificationType } from "./types";
import styles from "./Notification.module.css";
import { Navigate, useNavigate } from "react-router";
import { NavCon } from "../NavContext/NavContext";

const Notification = ({
  notification,
  difference,
  stylenames,
}: NotificationProps) => {
  console.log(stylenames);
  const { onClose } = useContext(NavCon);
  const navigate = useNavigate();
  const [actionStyle, setActionStyle] = useState<string>("");
  const [cardStyle, setCardStyle] = useState<string>("");
  const rowClickHandler = (notification: NotificationType) => {
    console.log(notification);

    if (!notification.contract_ref_id) {
      onClose();
      navigate("/MSA Overview");
    } else {
      onClose();
      navigate(`${notification.contract_ref_id}`, {
        state: { id: notification.contract_id },
      });
    }
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

import React, { useContext, useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Affix } from "antd";
import { Auth } from "../AuthContext/AuthContext";

const NavBarHandler = () => {
  const{currentUser}=useContext(Auth);
  console.log(currentUser);
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    const storedUserString = localStorage.getItem("user");
    if (currentUser) {
        setUsername(currentUser.user_name);
    } else {
      console.log("User data not found in localStorage");
    }
  }, []);
  console.log(username);

  return (
    <>
      <NavBar 
      username={username}
      />
    </>
  );
};

export default NavBarHandler;

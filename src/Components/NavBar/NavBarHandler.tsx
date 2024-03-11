import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Affix } from "antd";

const NavBarHandler = () => {
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    const storedUserString = localStorage.getItem("user");
    if (storedUserString !== null) {
      try {
        const user = JSON.parse(storedUserString);
        const fullName = `${user.first_name ?? ""} ${user.middle_name ?? ""} ${
          user.last_name ?? ""
        }`;
        const trimmedFullName = fullName.trim();
        setUsername(trimmedFullName);
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    } else {
      console.log("User data not found in localStorage");
    }
  }, []);
  console.log(username);

  return (
    <>
      <NavBar username={username} />
    </>
  );
};

export default NavBarHandler;

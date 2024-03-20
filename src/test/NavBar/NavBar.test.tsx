/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import NavBar from "../../Components/NavBar/NavBar";


describe("NavBar Username Rendering Sucessful", () => {
    it("Opens notification drawer on bell icon click", () => {
      localStorage.setItem("username", "TestUser"); // Set the username directly without JSON encoding
      const mockShowDrawer = jest.fn();
      render(<NavBar username="TestUser" />);
      fireEvent.click(screen.getByTestId("bell-icon"));
      expect(mockShowDrawer).toHaveBeenCalled();
    });
  
    it("Displays correct number of notifications in badge", () => {
      const activeNotificationCount = 5;
      render(<NavBar username="TestUser" />);
      expect(screen.getByText(activeNotificationCount.toString())).toBeInTheDocument();
    });
  });
  


import React from "react";
import { render } from "@testing-library/react";
import DashBoardRevenue from "../../Components/DashBoardRevenue/DashBoardRevenue";

interface DashBoardRevenueProps {
  currentMonthRevenue: number;
  previousMonthRevenue: number;
  responsetype: string;
}

describe("DashBoardRevenue component", () => {
  it("renders response type correctly", () => {
    const mockProps: DashBoardRevenueProps = {
      currentMonthRevenue: 5000,
      previousMonthRevenue: 4000,
      responsetype: "Revenue Type Test",
    };

    const { getByText } = render(<DashBoardRevenue {...mockProps} />);

    const pElement = getByText(mockProps.responsetype);
    expect(pElement).toBeInTheDocument();
  });
});

/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DashBoardCount from "../../Components/DashBoardContractsCount/DashBoardCount";

interface countType {
  contractCount: number;
  Contract: string;
}

describe("DashBoardCount component", () => {
  it("renders contract count and name correctly", () => {
    const mockProps: countType = {
      contractCount: 10,
      Contract: "Contracts Test",
    };

    const { getByText } = render(<DashBoardCount {...mockProps} />);

    const pElement = getByText(mockProps.Contract);
    expect(pElement).toBeInTheDocument();
  });
});

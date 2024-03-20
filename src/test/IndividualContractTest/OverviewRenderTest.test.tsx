/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import Overview from "../../Features/IndividualContract/Overview/Overview";
import { OverviewPropType } from "../../Features/IndividualContract/Overview/types";

describe("IndividualContract component", () => {
  it("renders without crashing", () => {
    const mockProps: OverviewPropType = {
      dateOfSignature: "2024-10-16",
      startDate: "2024-11-16",
      endDate: "2028-03-16",
      estimatedAmount: 30000,
      loading: false,
      contractTerm: 2,
      region: "US",
      isCompletedCount: 2,
      milestoneCount: 5,
      totalRevenue: 50000,
      revenueGenerated: 30000,
    };

    const { getByText } = render(<Overview {...mockProps} />);

    const h5Element = getByText(mockProps.region);
    expect(h5Element).toBeInTheDocument();
  });
});

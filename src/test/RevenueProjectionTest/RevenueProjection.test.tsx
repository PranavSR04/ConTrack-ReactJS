/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent,screen } from "@testing-library/react";
import { RevenueProjectionPropType } from "../../Features/RevenueProjection/types";
import RevenueProjection from "../../Features/RevenueProjection/RevenueProjection";


describe("Revenue Projection Page", () => {
  it("Graph Renders without crashing", () => {
    const mockRevenueProps: RevenueProjectionPropType = {
      filter: "Monthly",
      getFilteredValue: jest.fn(),
      showFilterModal: jest.fn(),
      isFilterModalOpen: true,
      handleOk: jest.fn(),
      handleCancel: jest.fn(),
      applyFilters: jest.fn(),
      renderCheckboxGroup: (filterType, options) => (
        <div data-testid={`checkboxGroup-${filterType}`}></div>
      ),
      onChange: jest.fn(),
      regionOptions: ["India", "America"],
      duOptions: ["DU1", "DU2"],
      selectedFilters: {},
      id: 1,
      onhandledatechange: jest.fn(),
      filterStartDate: "2024-01-01",
      filterEndDate: "2025-01-01"
    };

    const { getByTestId } = render(<RevenueProjection {...mockRevenueProps} />);

    // Assert that the graph renders
    const graph = getByTestId("line-chart");
    expect(graph).toBeInTheDocument();

    // // Example of testing user interaction:
    // // Simulate clicking on the filter icon
    // const filterIcon = getByTestId("filter-icon");
    // fireEvent.click(filterIcon);

    // // Assert that the filter modal is open
    // const filterModal = getByTestId("filter-modal");
    // expect(filterModal).toBeInTheDocument();

    // // Example of testing checkbox group rendering
    // const duCheckboxGroup = getByTestId("checkboxGroup-du");
    // expect(duCheckboxGroup).toBeInTheDocument();
  });
});

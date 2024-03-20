/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { LineChartPropType } from "../../Features/RevenueProjection/types";
import LineChart from "../../Features/RevenueProjection/LineChart";
import { JSX } from "react/jsx-runtime";
import { Line } from "@ant-design/plots";

describe("LineChart Graph", () => {
	// it("Renders the chart properly when loading is false", () => {
	// 	const mockProps: LineChartPropType = {
	// 		revenueData: [
	// 			{ Date: "2024-01-01", Revenue: 100000 },
	// 			{ Date: "2024-02-01", Revenue: 120000 },
	// 			{ Date: "2024-03-01", Revenue: 90000 },
	// 		],
	// 		loading: false,
	// 		error: undefined,
	// 	};

    //     const {getByText}=render(<LineChart {...mockProps}/>);
	// 	const heading = getByText("Revenue USD");
    //     expect(heading).toBeInTheDocument();

	
	// });

	it("Renders the spinner properly when loading is true", () => {
		const mockProps: LineChartPropType = {
			revenueData: undefined,
			loading: true,
			error: undefined,
		};

		const { getByTestId } = render(<LineChart {...mockProps} />);

		const spinner = getByTestId("line-chart-spinner");
		expect(spinner).toBeInTheDocument();
	});

	it("Renders the Error Message properly when no data", () => {
		const mockProps: LineChartPropType = {
			revenueData: undefined,
			loading: false,
			error: { error: "No data Found" },
		};

		const { getByTestId } = render(<LineChart {...mockProps} />);

		const errorCard = getByTestId("line-chart-error");
		expect(errorCard).toBeInTheDocument();
	});
});



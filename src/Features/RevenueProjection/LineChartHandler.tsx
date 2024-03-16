import React from "react";
import { LineChartHandlerPtopType, RevenueProjectionData } from "./types";
import { fetchRevenueProjection } from "./api/getRevenueProjection";
import { useEffect, useState } from "react";
import LineChart from "./LineChart";
import { AxiosError} from "axios";

const LineChartHandler = ({
	filter,
	selectedFilters,
	id

}: LineChartHandlerPtopType) => {
	const [revenueData, setRevenueData] = useState<RevenueProjectionData[]|undefined>([]);
    const [error,setError]=useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		fetRevenue();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filter, selectedFilters]);
	console.log(selectedFilters);
	const fetRevenue = async () => {
		const requestBody = {
			type: filter.toLowerCase(),
			du: selectedFilters.du,
            ctype:selectedFilters.cType
		};
		setLoading(true);
		try {
            console.log("inside fun")
			const data = await fetchRevenueProjection(id?id:undefined, requestBody);
			if (data instanceof AxiosError) {
			    console.log(data.response?.data);
                setRevenueData(undefined);
                setError(data.response?.data);
                
			} else {
				const convertedData: RevenueProjectionData[] = Object.entries(
					data.data
				).map(([key, value]) => ({
					Date: key,
					Revenue: value,
				}));
				console.log(convertedData);
				setRevenueData(convertedData);
			}
		} catch (error) {
			console.error("Error fetching revenue:", error);
            console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return <LineChart revenueData={revenueData} loading={loading} error={error}/>;
};

export default LineChartHandler;

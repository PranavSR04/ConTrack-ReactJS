import { CheckboxOptionType } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";

export type RevenueProjectionPropType = {
	getFilteredValue: (value: string) => void;
	filter: string;
	showFilterModal: () => void;
	isFilterModalOpen: boolean;
	handleOk: () => void;
	handleCancel: () => void;
	applyFilters: () => void;
	renderCheckboxGroup: (
		filterType: string,
		options:
			| (string | number | CheckboxOptionType<CheckboxValueType>)[]
			| undefined
	) => JSX.Element;
	onChange: (filterType: string, checkedValues: CheckboxValueType[]) => void;
	regionOptions: string[];
	duOptions: string[];
	selectedFilters: {};
	id:number |undefined;
};
export type RevenueProjectionHandlerPropType = {
	id?:number;
};

export interface RevenueProjectionData {
	Date: string;
	Revenue:number;
}

export interface LineChartPropType {
	revenueData: RevenueProjectionData[] | undefined;
	loading: boolean;
	error: { error?: string } | undefined;
}
export interface LineChartHandlerPtopType {
	filter: string;
	selectedFilters: SelectedFiltersType;
	id:number |undefined
	
}

export interface SelectedFiltersType {
	contractType?: string[];
	du?: string[];
	region?: string[];
	cType?: string[];
}

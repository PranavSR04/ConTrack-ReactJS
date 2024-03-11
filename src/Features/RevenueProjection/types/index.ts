import { CheckboxOptionType } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";

export type RevenueProjectionPropType = {
	handleLogout: () => Promise<void>;
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
};
export type RevenueProjectionHandlerPropType = {};

export interface RevenueProjectionData {
	Date: string;
	Revenue: unknown;
}

export interface LineChartPropType {
	revenueData: RevenueProjectionData[] | undefined;
	loading: boolean;
	error: { error?: string } | undefined;
}
export interface LineChartHandlerPtopType {
	filter: string;
	selectedFilters: SelectedFiltersType;
}

export interface SelectedFiltersType {
	contractType?: string[];
	du?: string[];
	region?: string[];
	ctype?: string[];
}

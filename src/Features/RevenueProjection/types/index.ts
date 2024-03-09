export type RevenueProjectionPropType = {
	handleLogout: () => Promise<void>;
	fetRevenue: () => Promise<void>;
};
export type RevenueProjectionHandlerPropType = {};

export interface RevenueProjectionData {
	Date: string;
	Revenue: unknown;
}

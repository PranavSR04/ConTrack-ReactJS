import React from "react";
import styles from "./RevenueProjection.module.css";
import {
  Button,
	Card,
	ConfigProvider,
	Modal,
	Segmented,
} from "antd";
import { RevenueProjectionPropType } from "./types";
import LineChartHandler from "./LineChartHandler";
import { HiOutlineFilter } from "react-icons/hi";


const RevenueProjection = ({
	handleLogout,
	filter,
	getFilteredValue,
	showFilterModal,
	isFilterModalOpen,
	handleOk,
	handleCancel,
	applyFilters,
	renderCheckboxGroup,
	onChange,
	regionOptions,
	duOptions,
	selectedFilters,
}: RevenueProjectionPropType) => {
	console.log(filter);
	
	return (
		<div className={styles.revueneProjection}>
			<div>
				<Card title={`${filter} Revenue Projection`} className={styles.card}>
					<ConfigProvider
						theme={{
							token: {
								borderRadius: 20,
								borderRadiusLG: 20,
							},
							components: {
								Segmented: {
									itemSelectedBg: "#DC143C",
									itemSelectedColor: "#FFF",
								},
							},
						}}
					>
						<div style={{ marginBottom: "1rem" }}>
							<Segmented<string>
								options={["Monthly", "Quarterly", "Yearly"]}
								defaultValue="Monthly"
								size="large"
								onChange={(value) => {
									getFilteredValue(value);
								}}
							/>
							<HiOutlineFilter
								className={styles.filtericon}
								size={20}
								onClick={showFilterModal}
							/>
							<div className={styles.filterModal}>
								<Modal
									title="Revenue Filter"
									open={isFilterModalOpen}
									onOk={handleOk}
									onCancel={handleCancel}
									mask={false}
									className={styles.filterModal}
									footer={null}
								>
									{renderCheckboxGroup("du", duOptions)}
									{renderCheckboxGroup("region", regionOptions)}
                  {renderCheckboxGroup("contractType", ['Fixed Fee','Time & Material'])}
								</Modal>
							</div>
						</div>
					</ConfigProvider>

					<Card>

						<LineChartHandler
							filter={filter}
							selectedFilters={selectedFilters}
						/>
					</Card>
				</Card>
			</div>
		</div>
	);
};

export default RevenueProjection;

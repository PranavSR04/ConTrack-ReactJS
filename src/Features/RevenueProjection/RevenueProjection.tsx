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
	// const onChange = (list: CheckboxValueType[]) => {
	//   console.log(list)
	// };
	// const onCheckAllChange = (e: { target: { checked: any; }; }) => {
	//   console.log(e.target.checked ? plainOptions : []);
	//   console.log(e);
	// };
	// const plainOptions = ['Apple', 'Pear', 'Orange'];

	// const options = [
	//   { label: 'Apple', value: 'Apple' },
	//   { label: 'Pear', value: 'Pear' },
	//   { label: 'Orange', value: 'Orange' },
	// ];

	// const optionsWithDisabled = [
	//   { label: 'Apple', value: 'Apple' },
	//   { label: 'Pear', value: 'Pear' },
	//   { label: 'Orange', value: 'Orange', disabled: false },
	// ];

	return (
		<div className={styles.revueneProjection}>
			{/* <Button type="primary" onClick={handleLogout}>
				Logout
			</Button> */}
			

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

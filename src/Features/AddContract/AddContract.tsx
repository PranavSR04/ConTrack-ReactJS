import React, { useState } from "react";
import AddContractHandler from "./AddContractHandler";
import { AddContractPropType, ContractDetails } from "./types";
import styles from "./AddContract.module.css";

import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
} from "antd";
import {
  PlusOutlined,
  CloseCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Toast from "../../Components/Toast/Toast";

const AddContract = ({
  contractAdded,
  contractType,
  selectClient,
  handleMilestoneChange,
  handleSubmit,
  handleFileUpload,
  handleCommentsRemarksChange,
  handleTotalContractValueChange,
  handlePaymentPercentageChange,
  handleAmount,
  removeMilestone,
  handleAddMilestone,
  handleContractTypeChange,
  getClientName,
  clientNameOptions,
  contractDetails,
  setContractDetails,
  milestones,
}: AddContractPropType) => {
  // const [contractType, setContractType] = useState<string | null>(null);

  // const handleSubmit = (data: ContractDetails) => {
  //   // Handle the form submission data
  //   console.log("Form Data:", data);
  //   // You can make API calls, dispatch actions, etc. here
  // };

  return (
    <>
      <div className="container">
        <h1 style={{ marginLeft: "14rem", paddingTop: "2rem" }}>
          Add Contract
        </h1>
        {/* <AddContractHandler onSubmit={handleSubmit} /> */}
        <>
          {contractAdded ? (
            <Toast
              message="Contract Added successfully!"
              messageType="success"
            />
          ) : (
            <></>
          )}
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 1200 }}
            onFinish={handleSubmit}
            encType="multipart/form-data"
          >
            <div className={`contract_details ${styles.contract_details}`}>
              <br />
              <div
                className={`contract_details_heading ${styles.contract_details_heading}`}
              >
                Contract Details
              </div>

              {/* Contract Details Form Items */}
              <div style={{ display: "flex", padding: "1rem" }}>
                <Form.Item
                  label="Client Name"
                  labelCol={{ span: 15 }}
                  wrapperCol={{ span: 11 }}
                  required
                  style={{ marginLeft: "-2rem" }}
                >
                  <AutoComplete
                    options={clientNameOptions}
                    onSelect={selectClient}
                    onSearch={getClientName}
                    placeholder="Client Name"
                    style={{ width: "10rem" }}
                  />
                </Form.Item>
                <Form.Item
                  label="Contract ID"
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 14 }}
                  style={{ paddingLeft: "2rem", marginLeft: "4rem" }}
                  required
                >
                  <Input
                    value={contractDetails.contract_ref_id}
                    onChange={(e) =>
                      setContractDetails({
                        ...contractDetails,
                        contract_ref_id: e.target.value,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="Region"
                  required
                  labelCol={{ span: 9 }}
                  wrapperCol={{ span: 12 }}
                >
                  <Input value={contractDetails.region} disabled />
                </Form.Item>
                <Form.Item
                  label="DU"
                  name="du"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{ paddingLeft: "2rem", marginLeft: "-1.5rem" }}
                  required
                >
                  <Select
                    placeholder="DU"
                    value={contractDetails.du}
                    style={{ width: "100%" }}
                    onChange={(value) =>
                      setContractDetails({
                        ...contractDetails,
                        du: value,
                      })
                    }
                  >
                    <Select.Option value="du1">DU1</Select.Option>
                    <Select.Option value="du2">DU2</Select.Option>
                    <Select.Option value="du3">DU3</Select.Option>
                    <Select.Option value="du4">DU4</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div style={{ display: "flex", padding: "1rem" }}>
                <Form.Item
                  label="Start Date"
                  labelCol={{ span: 11 }}
                  wrapperCol={{ span: 21 }}
                  required
                >
                  <DatePicker
                    value={contractDetails.start_date}
                    onChange={(value) =>
                      setContractDetails({
                        ...contractDetails,
                        start_date: value,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="End Date"
                  labelCol={{ span: 10 }}
                  wrapperCol={{ span: 26 }}
                  style={{ paddingLeft: "2rem" }}
                  required
                >
                  <DatePicker
                    value={contractDetails.end_date}
                    onChange={(value) =>
                      setContractDetails({
                        ...contractDetails,
                        end_date: value,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="Date Of Signature"
                  labelCol={{ span: 14 }}
                  wrapperCol={{ span: 23 }}
                  style={{ paddingLeft: "2rem" }}
                  required
                >
                  <DatePicker
                    value={contractDetails.date_of_signature}
                    onChange={(value) =>
                      setContractDetails({
                        ...contractDetails,
                        date_of_signature: value,
                      })
                    }
                  />
                </Form.Item>
              </div>
              <div style={{ display: "flex", padding: "1rem" }}>
                <Form.Item
                  label="Contract Type"
                  name="contract_type"
                  labelCol={{ span: 244 }}
                  wrapperCol={{ span: 19 }}
                  style={{ marginLeft: "1.3rem" }}
                  required
                >
                  <Select
                    placeholder="Contract Type"
                    onChange={handleContractTypeChange}
                  >
                    <Select.Option value="FF">Fixed Fee</Select.Option>
                    <Select.Option value="TM">T&M</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </div>

            {contractType === "FF" && (
              <>
                {/* Milestone Details */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    padding: "1rem",
                    width: "113%",
                  }}
                >
                  <div
                    className={`contract_details ${styles.contract_details}`}
                    style={{ marginLeft: "13rem" }}
                  >
                    <div
                      className={`contract_details_heading ${styles.contract_details_heading}`}
                    >
                      <br />
                      Milestone Details
                    </div>
                    <div
                      style={{
                        paddingTop: "0.5rem",
                        marginTop: "-3rem",
                        marginLeft: "16.5rem",
                      }}
                    >
                      <Form.Item
                        label="Total Contract Value"
                        name="estimated_amount"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 8 }}
                        required
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          onChange={handleTotalContractValueChange}
                        />
                      </Form.Item>
                    </div>
                    <div
                      style={{
                        marginLeft: "49.5rem",
                        marginTop: "-4rem",
                        padding: "0.5rem",
                      }}
                    >
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddMilestone}
                        style={{ fontWeight: "bold" }}
                      >
                        Add
                      </Button>
                    </div>
                    {/* Headers */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        padding: "1rem",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ width: "30%", marginRight: "2.3rem" }}>
                        <div
                          style={{ marginBottom: "0.5rem", marginLeft: "2rem" }}
                        >
                          Milestones
                        </div>
                      </div>
                      <div style={{ width: "30%", marginRight: "0.5rem" }}>
                        <div style={{ marginBottom: "0.5rem" }}>
                          Expected Completion Date
                        </div>
                      </div>
                      <div style={{ width: "10%", marginRight: "0.8rem" }}>
                        <div style={{ marginBottom: "0.5rem" }}>Payment(%)</div>
                      </div>
                      <div style={{ width: "20%", marginRight: "1rem" }}>
                        <div style={{ marginBottom: "0.5rem" }}>
                          Payment Amount(US$)
                        </div>
                      </div>
                    </div>
                    {milestones.map((milestone, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          padding: "1rem",
                          paddingLeft: "3rem",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ width: "30%", marginRight: "1rem" }}>
                          <Form.Item
                            name={`milestones[${index}].milestones`}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            required
                          >
                            <Input
                              value={milestone.milestones || ""}
                              onChange={(e) =>
                                handleMilestoneChange(
                                  index,
                                  "milestones",
                                  e.target.value
                                )
                              }
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </div>
                        <div style={{ width: "30%", marginRight: "1rem" }}>
                          <Form.Item
                            name={`milestones[${index}].expectedCompletionDate`}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            required
                          >
                            <DatePicker
                              style={{ width: "100%" }}
                              onChange={(date) =>
                                handleMilestoneChange(
                                  index,
                                  "expectedCompletionDate",
                                  date
                                )
                              }
                            />
                          </Form.Item>
                        </div>
                        <div style={{ width: "10%", marginRight: "1rem" }}>
                          <Form.Item
                            name={`milestones[${index}].percentage`}
                            labelCol={{ span: 20 }}
                            wrapperCol={{ span: 20 }}
                            required
                          >
                            <InputNumber
                              style={{ width: "100%" }}
                              onChange={(value) =>
                                handlePaymentPercentageChange(
                                  index,
                                  value as number
                                )
                              }
                            />
                          </Form.Item>
                        </div>

                        <div style={{ width: "20%", marginRight: "1rem" }}>
                          <Form.Item
                            name={`milestones[${index}].amount`}
                            labelCol={{ span: 20 }}
                            wrapperCol={{ span: 20 }}
                            required
                          >
                            <InputNumber
                              style={{ width: "100%" }}
                              value={milestone.amount}
                            />
                          </Form.Item>
                        </div>
                        {index > 0 && (
                          <Button
                            type="text"
                            style={{
                              color: "red",
                              marginLeft: "-2rem",
                              marginTop: "-1rem",
                            }}
                            onClick={() => removeMilestone(index)}
                            icon={<CloseCircleOutlined />}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Associated Members */}
                <div
                  className={`contract_details ${styles.contract_details}`}
                  style={{ width: "46.5%" }}
                >
                  <br />
                  <div
                    className={`contract_details_heading ${styles.contract_details_heading}`}
                  >
                    Associated Members
                  </div>
                  <div
                    style={{ display: "flex", padding: "1rem", width: "100%" }}
                  >
                    <Form.Item
                      style={{ width: "100%", height: "100%" }}
                      required
                    >
                      <Select
                        mode="tags"
                        placeholder="Please select or type"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "5px",
                          paddingLeft: "10px",
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>

                <div style={{ display: "flex", width: "100%" }}>
                  {/* Upload Work Schedule */}
                  <div
                    className={`contract_details ${styles.contract_details}`}
                    style={{ width: "46.5%" }}
                  >
                    <br />
                    <div
                      className={`contract_details_heading ${styles.contract_details_heading}`}
                    >
                      Upload Work Schedule
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "10rem",
                      }}
                    >
                      <div
                        style={{
                          border: "2px dashed #ccc",
                          padding: "3rem",
                          textAlign: "center",
                          borderRadius: "5px",
                          width: "32rem",
                        }}
                      >
                        <Upload
                          accept=".pdf"
                          //   action=""
                          customRequest={handleFileUpload}
                          maxCount={1}
                        >
                          <Button icon={<UploadOutlined />}>
                            Click to Upload (Max: 50MB)
                          </Button>
                        </Upload>
                      </div>
                    </div>
                  </div>

                  {/* Comments and Remarks */}
                  <div
                    className={`contract_details ${styles.contract_details}`}
                    style={{ width: "40%", marginLeft: "2rem" }}
                  >
                    <br />
                    <div
                      className={`contract_details_heading ${styles.contract_details_heading}`}
                    >
                      Comments and Remarks
                    </div>
                    <div
                      style={{
                        display: "flex",
                        padding: "1rem",
                        width: "100%",
                      }}
                    >
                      <Form.Item
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 22 }}
                        style={{ width: "35rem" }}
                      >
                        <Input.TextArea
                          rows={8}
                          placeholder="Enter comments and remarks..."
                          value={contractDetails.comments ?? ""}
                          onChange={handleCommentsRemarksChange}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </>
            )}

            {contractType === "TM" && (
              <>
                {/* Milestone Details */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    padding: "1rem",
                    width: "113%",
                  }}
                >
                  <div
                    className={`contract_details ${styles.contract_details}`}
                    style={{ marginLeft: "13rem" }}
                  >
                    <div
                      className={`contract_details_heading ${styles.contract_details_heading}`}
                    >
                      <br />
                      Milestone Details
                    </div>

                    <div
                      style={{
                        paddingTop: "0.5rem",
                        marginTop: "-3rem",
                        marginLeft: "16.5rem",
                      }}
                    >
                      <Form.Item
                        label="Total Contract Value"
                        name="estimated_amount"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 8 }}
                        required
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          onChange={handleTotalContractValueChange}
                        />
                      </Form.Item>
                    </div>

                    <div
                      style={{
                        marginLeft: "49.5rem",
                        marginTop: "-4rem",
                        padding: "0.5rem",
                      }}
                    >
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddMilestone}
                        style={{ fontWeight: "bold" }}
                      >
                        Add
                      </Button>
                    </div>

                    {/* Headers */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        padding: "1rem",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ width: "30%", marginRight: "2.3rem" }}>
                        <div
                          style={{ marginBottom: "0.5rem", marginLeft: "2rem" }}
                        >
                          Milestones
                        </div>
                      </div>
                      <div style={{ width: "30%", marginRight: "0.5rem" }}>
                        <div style={{ marginBottom: "0.5rem" }}>
                          Expected Completion Date
                        </div>
                      </div>
                      <div style={{ width: "20%", marginRight: "1rem" }}>
                        <div style={{ marginBottom: "0.5rem" }}>
                          Payment Amount(US$)
                        </div>
                      </div>
                    </div>

                    {milestones.map((milestone, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          padding: "1rem",
                          paddingLeft: "3rem",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ width: "30%", marginRight: "1rem" }}>
                          <Form.Item
                            name={`milestones[${index}].milestones`}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            required
                          >
                            <Input
                              value={milestone.milestones || ""}
                              onChange={(e) =>
                                handleMilestoneChange(
                                  index,
                                  "milestones",
                                  e.target.value
                                )
                              }
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </div>
                        <div style={{ width: "30%", marginRight: "1rem" }}>
                          <Form.Item
                            name={`milestones[${index}].expectedCompletionDate`}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            required
                          >
                            <DatePicker
                              style={{ width: "100%" }}
                              onChange={(date) =>
                                handleMilestoneChange(
                                  index,
                                  "expectedCompletionDate",
                                  date
                                )
                              }
                            />
                          </Form.Item>
                        </div>

                        <div style={{ width: "20%", marginRight: "1rem" }}>
                          <Form.Item
                            name={`milestones[${index}].amount`}
                            labelCol={{ span: 20 }}
                            wrapperCol={{ span: 20 }}
                            required
                          >
                            <InputNumber
                              style={{ width: "100%" }}
                              value={milestone.amount}
                              onChange={(e) => handleAmount(e)}
                            />
                          </Form.Item>
                        </div>
                        {index > 0 && (
                          <Button
                            type="text"
                            style={{
                              color: "red",
                              marginLeft: "-2rem",
                              marginTop: "-1rem",
                            }}
                            onClick={() => removeMilestone(index)}
                            icon={<CloseCircleOutlined />}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Associated Members */}
                <div
                  className={`contract_details ${styles.contract_details}`}
                  style={{ width: "46.5%" }}
                >
                  <br />
                  <div
                    className={`contract_details_heading ${styles.contract_details_heading}`}
                  >
                    Associated Members
                  </div>
                  <div
                    style={{ display: "flex", padding: "1rem", width: "100%" }}
                  >
                    <Form.Item
                      style={{ width: "100%", height: "100%" }}
                      required
                    >
                      <Select
                        mode="tags"
                        placeholder="Please select or type"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "5px",
                          paddingLeft: "10px",
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>

                <div style={{ display: "flex", width: "100%" }}>
                  {/* Upload Work Schedule */}
                  <div
                    className={`contract_details ${styles.contract_details}`}
                    style={{ width: "46.5%" }}
                  >
                    <br />
                    <div
                      className={`contract_details_heading ${styles.contract_details_heading}`}
                    >
                      Upload Work Schedule
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "10rem",
                      }}
                    >
                      <div
                        style={{
                          border: "2px dashed #ccc",
                          padding: "3rem",
                          textAlign: "center",
                          borderRadius: "5px",
                          width: "32rem",
                        }}
                      >
                        <Upload
                          accept=".pdf"
                          //   action=""
                          customRequest={handleFileUpload}
                        >
                          <Button icon={<UploadOutlined />}>
                            Click to Upload (Max: 50MB)
                          </Button>
                        </Upload>
                      </div>
                    </div>
                  </div>

                  {/* Comments and Remarks */}
                  <div
                    className={`contract_details ${styles.contract_details}`}
                    style={{ width: "40%", marginLeft: "2rem" }}
                  >
                    <br />
                    <div
                      className={`contract_details_heading ${styles.contract_details_heading}`}
                    >
                      Comments and Remarks
                    </div>
                    <div
                      style={{
                        display: "flex",
                        padding: "1rem",
                        width: "100%",
                      }}
                    >
                      <Form.Item
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 22 }}
                        style={{ width: "35rem" }}
                      >
                        <Input.TextArea
                          rows={8}
                          placeholder="Enter comments and remarks..."
                          value={contractDetails.comments ?? ""}
                          onChange={handleCommentsRemarksChange}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </>
            )}
            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
              <Button
                type="primary"
                htmlType="submit"
                className={
                  contractType
                    ? styles.submitButton
                    : `${styles.submitButton} ${styles.submitButtonDisabled}`
                }
                disabled={!contractType}
              >
                Add Contract
              </Button>
            </Form.Item>
          </Form>
        </>
      </div>
    </>
  );
};

export default AddContract;

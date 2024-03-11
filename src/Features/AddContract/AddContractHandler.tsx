import React, { useEffect, useState } from "react";
import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";
import {
  PlusOutlined,
  CloseCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Upload } from "antd";
import { Milestone, ContractDetails } from "./types/AddContractTypes";
import styles from "./AddContract.module.css";
import "./api/api";
import dayjs from "dayjs";
import { getMSA } from "./api/getMSA";
import { AxiosResponse } from "axios";

interface AddContractHandlerProps {
  onSubmit: (data: ContractDetails) => void;
}

const AddContractHandler: React.FC<AddContractHandlerProps> = ({
  onSubmit,
}) => {
  const [contractDetails, setContractDetails] = useState<ContractDetails>({
    clientName: "",
    contractId: "",
    region: "",
    du: "",
    startDate: "",
    endDate: "",
    dateOfSignature: "",
    contractType: null,
    totalContractValue: null,
    milestones: [
      {
        milestones: null,
        expectedCompletionDate: null,
        paymentPercentage: null,
        paymentAmount: null,
      },
    ],
    associatedMembers: [],
    workSchedule: null as File | null,
    commentsRemarks: "",
  });

  const [milestones, setMilestones] = useState<Milestone[]>(
    contractDetails.milestones
  );

  const [clientNameOptions, setClientNameOptions] = useState<
    { value: string }[]
  >([]);

  const getClientName = async (searchValue: string) => {
    try {
      const response = await getMSA(searchValue);
      const result = response.data;

      const clientNames = result.map((item: any) => item.client_name);
      const uniqueOptions: { value: string }[] = Array.from(
        new Set(clientNames)
      ).map((name) => ({ value: name as string }));

      setClientNameOptions(uniqueOptions);
    } catch (error) {
      console.error("Error fetching client names:", error);
    }
  };

  const [contractType, setContractType] = useState<string | null>(null);

  const handleContractTypeChange = (value: string) => {
    setContractDetails({
      ...contractDetails,
      contractType: value,
    });
    setContractType(value);
  };

  const handleAddMilestone = () => {
    setMilestones([
      ...milestones,
      {
        milestones: null,
        expectedCompletionDate: null,
        paymentPercentage: null,
        paymentAmount: null,
      },
    ]);
  };

  const removeMilestone = (index: number) => {
    const updatedMilestones = [...milestones];
    updatedMilestones.splice(index, 1);
    setMilestones(updatedMilestones);
  };

  const handlePaymentPercentageChange = (
    index: number,
    value: number | undefined
  ) => {
    // console.log("rendered");
    if (value !== undefined && contractDetails.totalContractValue !== null) {
      const updatedMilestones = milestones.map((milestone, idx) => {
        if (idx === index) {
          const paymentAmount =
            (value / 100) * (contractDetails.totalContractValue ?? 0);
          return {
            ...milestone,
            paymentPercentage: value,
            paymentAmount: paymentAmount,
          };
        } else return milestone;
      });
      setMilestones(updatedMilestones);

      // Also update the contractDetails if needed
      const updatedContractDetails = {
        ...contractDetails,
        milestones: updatedMilestones,
      };
      setContractDetails(updatedContractDetails);
    }
  };

  const handleTotalContractValueChange = (value: number | null) => {
    if (value !== undefined && value !== null) {
      setContractDetails({
        ...contractDetails,
        totalContractValue: value,
        milestones: milestones.map((milestone) => ({
          ...milestone,
          paymentAmount: ((milestone.paymentPercentage ?? 0) / 100) * value,
        })),
      });
    }
  };
  const handleCommentsRemarksChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setContractDetails({
      ...contractDetails,
      commentsRemarks: value,
    });
  };

  const handleFileUpload = (info: any) => {
    try {
      console.log("File uploaded successfully:", info.file);
      setContractDetails({ ...contractDetails, workSchedule: info.file });
    } catch (e) {
      console.log("file upload error is", e);
    }
  };

  const handleSubmit = () => {
    onSubmit(contractDetails);
    console.log(contractDetails);
  };

  const handleMilestoneChange = (
    index: number,
    field: string,
    value: string | dayjs.Dayjs | number | null
  ) => {
    let convertedValue: Date | null = null;
    console.log("tm rendered");
    // Convert dayjs object to Date
    if (dayjs.isDayjs(value)) {
      convertedValue = (value as dayjs.Dayjs).toDate();
    }
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = {
      ...updatedMilestones[index],
      [field]: value,
    };
    setMilestones(updatedMilestones);

    // Update contractDetails as well if needed
    const updatedContractDetails = {
      ...contractDetails,
      milestones: updatedMilestones,
    };
    setContractDetails(updatedContractDetails);
  };

  useEffect(() => {
    let responses;
    const fetchMSA = async () => {
      try {
        responses = await getMSA();
        console.log("msa response", responses.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMSA();
  }, []);

  const selectClient = async (value: string) => {
    // Fetch client data including region
    try {
      const response = await getMSA(value);
      const clientData = response.data[0]; // Assuming you get one client data
      if (clientData) {
        // Update contractDetails with client data
        setContractDetails({
          ...contractDetails,
          clientName: clientData.client_name,
          region: clientData.region,
          // Other fields you want to update
        });
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  };

  return (
    <>
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
                value={contractDetails.contractId}
                onChange={(e) =>
                  setContractDetails({
                    ...contractDetails,
                    contractId: e.target.value,
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
              <Input
                value={contractDetails.region}
                disabled // Disable editing since it's autofilled
              />
            </Form.Item>
            <Form.Item
              label="DU"
              name="du"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 17 }}
              style={{ paddingLeft: "2rem", marginLeft: "-2rem" }}
              required
            >
              <Select
                placeholder="Select DU"
                value={contractDetails.du}
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
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              required
            >
              <DatePicker
                value={contractDetails.startDate}
                onChange={(value) =>
                  setContractDetails({
                    ...contractDetails,
                    startDate: value,
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
                value={contractDetails.endDate}
                onChange={(value) =>
                  setContractDetails({
                    ...contractDetails,
                    endDate: value,
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="Date Of Signature"
              labelCol={{ span: 14 }}
              wrapperCol={{ span: 23 }}
              style={{ paddingLeft: "3.3rem" }}
              required
            >
              <DatePicker
                value={contractDetails.dateOfSignature}
                onChange={(value) =>
                  setContractDetails({
                    ...contractDetails,
                    dateOfSignature: value,
                  })
                }
              />
            </Form.Item>
          </div>
          <div style={{ display: "flex", padding: "1rem" }}>
            <Form.Item
              label="Contract Type"
              name="contracttype"
              labelCol={{ span: 244 }}
              wrapperCol={{ span: 19 }}
              style={{ paddingLeft: "0rem" }}
              required
            >
              <Select
                placeholder="Contract Type"
                onChange={handleContractTypeChange}
              >
                <Select.Option value="ff">Fixed Fee</Select.Option>
                <Select.Option value="tm">T&M</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        {contractType === "ff" && (
          <>
            {/* Milestone Details */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                padding: "1rem",
              }}
            >
              <div
                className={`contract_details ${styles.contract_details}`}
                style={{ marginLeft: "9rem" }}
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
                    name="totalContractValue"
                    labelCol={{ span: 5 }}
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
                    marginLeft: "58.5rem",
                    marginTop: "-3.5rem",
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
                  <div style={{ width: "30%", marginRight: "1rem" }}>
                    <div style={{ marginBottom: "0.5rem" }}>Milestones</div>
                  </div>
                  <div style={{ width: "30%", marginRight: "1rem" }}>
                    <div style={{ marginBottom: "0.5rem" }}>
                      Expected Completion Date
                    </div>
                  </div>
                  <div style={{ width: "10%", marginRight: "1rem" }}>
                    <div style={{ marginBottom: "0.5rem" }}>Payment(%)</div>
                  </div>
                  <div style={{ width: "20%" }}>
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
                        name={`milestones[${index}].paymentPercentage`}
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

                    <div style={{ width: "20%" }}>
                      <Form.Item
                        name={`milestones[${index}].paymentAmount`}
                        labelCol={{ span: 20 }}
                        wrapperCol={{ span: 20 }}
                        required
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          //   value={milestone.paymentAmount}
                        />
                      </Form.Item>
                    </div>
                    {index > 0 && (
                      <Button
                        type="text"
                        style={{ color: "red", marginLeft: 8 }}
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
              style={{ width: "50%" }}
            >
              <br />
              <div
                className={`contract_details_heading ${styles.contract_details_heading}`}
              >
                Associated Members
              </div>
              <div style={{ display: "flex", padding: "1rem", width: "100%" }}>
                <Form.Item style={{ width: "100%", height: "100%" }} required>
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
                style={{ width: "50%" }}
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
                      action=""
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
                style={{ width: "50%" }}
              >
                <br />
                <div
                  className={`contract_details_heading ${styles.contract_details_heading}`}
                >
                  Comments and Remarks
                </div>
                <div
                  style={{ display: "flex", padding: "1rem", width: "100%" }}
                >
                  <Form.Item
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 22 }}
                    style={{ width: "35rem" }}
                  >
                    <Input.TextArea
                      rows={8}
                      placeholder="Enter comments and remarks..."
                      value={contractDetails.commentsRemarks ?? ""}
                      onChange={handleCommentsRemarksChange}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </>
        )}

        {contractType === "tm" && (
          <>
            {/* Milestone Details */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                padding: "1rem",
              }}
            >
              <div
                className={`contract_details ${styles.contract_details}`}
                style={{ marginLeft: "9rem" }}
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
                    name="totalContractValue"
                    labelCol={{ span: 5 }}
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
                    marginLeft: "58.5rem",
                    marginTop: "-3.5rem",
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
                  <div style={{ width: "30%", marginRight: "1rem" }}>
                    <div style={{ marginBottom: "0.5rem" }}>Milestones</div>
                  </div>
                  <div style={{ width: "30%", marginRight: "1rem" }}>
                    <div style={{ marginBottom: "0.5rem" }}>
                      Expected Completion Date
                    </div>
                  </div>

                  <div style={{ width: "20%" }}>
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

                    <div style={{ width: "20%" }}>
                      <Form.Item
                        name={`milestones[${index}].paymentAmount`}
                        labelCol={{ span: 20 }}
                        wrapperCol={{ span: 20 }}
                        required
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          // value={milestone.paymentAmount}
                          onChange={
                            (value) =>
                              handleMilestoneChange(
                                index,
                                "paymentAmount",
                                value as number
                              )
                            // console.log(value)
                          }
                        />
                      </Form.Item>
                    </div>
                    {index > 0 && (
                      <Button
                        type="text"
                        style={{ color: "red", marginLeft: 8 }}
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
              style={{ width: "50%" }}
            >
              <br />
              <div
                className={`contract_details_heading ${styles.contract_details_heading}`}
              >
                Associated Members
              </div>
              <div style={{ display: "flex", padding: "1rem", width: "100%" }}>
                <Form.Item style={{ width: "100%", height: "100%" }} required>
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
                style={{ width: "50%" }}
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
                      action=""
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
                className={`contract_details_heading ${styles.contract_details_heading}`}
              >
                Comments and Remarks
              </div>
              <div style={{ display: "flex", padding: "1rem", width: "100%" }}>
                <Form.Item
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 22 }}
                  style={{ width: "35rem" }}
                >
                  <Input.TextArea
                    rows={8}
                    placeholder="Enter comments and remarks..."
                    value={contractDetails.commentsRemarks ?? ""}
                    onChange={handleCommentsRemarksChange}
                  />
                </Form.Item>
              </div>
            </div>
          </>
        )}
        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!contractType}
            style={{ marginTop: "2rem" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddContractHandler;

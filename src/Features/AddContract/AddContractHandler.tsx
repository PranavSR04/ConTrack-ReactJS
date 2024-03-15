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
import { Milestone, ContractDetails, RcFile } from "./types";
import styles from "./AddContract.module.css";
import "./api/api";
import dayjs from "dayjs";
import { getMSA } from "./api/getMSA";
import { AxiosResponse } from "axios";
import { addContract } from "./api/api";
import { UploadRequestOption } from "rc-upload/lib/interface";
import moment from "moment";
import Toast from "../../Components/Toast/Toast";
import { useNavigate } from "react-router-dom";
import AddContract from "./AddContract";

// import { RcFile } from "antd/lib/upload";

// interface AddContractHandlerProps {
//   onSubmit: (data: ContractDetails) => void;
// }

const AddContractHandler= () => {
  const [contractDetails, setContractDetails] = useState<ContractDetails>({
    msa_id: "",
    clientName: "",
    contract_ref_id: "",
    region: "",
    du: "",
    start_date: "",
    end_date: "",
    date_of_signature: "",
    contract_type: "TM",
    milestone: [
      {
        milestones: "",
        expectedCompletionDate: null,
        percentage: null,
        amount: null,
      },
    ],
    associatedMembers: [],
    file: null as RcFile | null,
    comments: "",
    estimated_amount: null,
    contract_added_by: 3,
  });

  const [contractAdded, setContractAdded] = useState<boolean>(false);
  const [milestones, setMilestones] = useState<Milestone[]>(
    contractDetails.milestone
  );

  const [clientNameOptions, setClientNameOptions] = useState<
    { value: string }[]
  >([]);

  const navigate = useNavigate();

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

  const handleContractTypeChange = (value: "FF" | "TM") => {
    setContractDetails({
      ...contractDetails,
      contract_type: value,
    });
    setContractType(value);
  };

  const handleAddMilestone = () => {
    setMilestones([
      ...milestones,
      {
        milestones: "",
        expectedCompletionDate: null,
        percentage: null,
        amount: null,
      },
    ]);
  };

  const removeMilestone = (index: number) => {
    const updatedMilestones = [...milestones];
    updatedMilestones.splice(index, 1);
    setMilestones(updatedMilestones);
  };

  const handleAmount = (paymentamount: number | null) => {
    const updatedMilestones = milestones.map((milestone) => {
      return {
        ...milestone,
        percentage: null,
        amount: paymentamount,
      };
    });
    setMilestones(updatedMilestones);

    // Also update the contractDetails if needed
    const updatedContractDetails = {
      ...contractDetails,
      milestone: updatedMilestones,
    };
    setContractDetails(updatedContractDetails);
  };
  const handlePaymentPercentageChange = (
    index: number,
    value: number | undefined
  ) => {
    // console.log("rendered");
    if (value !== undefined && contractDetails.estimated_amount !== null) {
      const updatedMilestones = milestones.map((milestone, idx) => {
        if (idx === index) {
          const paymentAmount =
            (value / 100) * (contractDetails.estimated_amount ?? 0);
          // console.log("consoled amount", paymentAmount)
          return {
            ...milestone,
            percentage: value,
            amount: paymentAmount,
          };
        } else return milestone;
      });
      setMilestones(updatedMilestones);

      // Also update the contractDetails if needed
      const updatedContractDetails = {
        ...contractDetails,
        milestone: updatedMilestones,
      };
      setContractDetails(updatedContractDetails);
    }
  };

  const handleTotalContractValueChange = (value: number | null) => {
    if (value !== undefined && value !== null) {
      setContractDetails({
        ...contractDetails,
        estimated_amount: value,
        milestone: milestones.map((milestone) => ({
          ...milestone,
          amount: ((milestone.percentage ?? 0) / 100) * value,
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
      comments: value,
    });
  };

  const handleFileUpload = (info: UploadRequestOption<any>) => {
    try {
      console.log("File uploaded successfully:", info.file as RcFile);
      console.log({ ...contractDetails, workSchedule: info.file as RcFile });
      setContractDetails({
        ...contractDetails,
        file: info.file as RcFile,
      });
    } catch (e) {
      console.log("file upload error is", e);
    }
  };

  const handleSubmit = async () => {
    // onSubmit(contractDetails);

    try {
      await addContract(contractDetails);
      setContractAdded(true);
      navigate("/allContracts");
    } catch (error) {
      console.log("Form not submitted");
    }
  };

  const handleMilestoneChange = (
    index: number,
    field: string,
    value: string | dayjs.Dayjs | number | null
  ) => {
    let convertedValue: Date | null = null;
    // Convert dayjs object to Date
    if (dayjs.isDayjs(value)) {
      convertedValue = (value as dayjs.Dayjs).toDate();
    }
    console.log("conv value", convertedValue);
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = {
      ...updatedMilestones[index],
      [field]: dayjs.isDayjs(value) ? convertedValue : value,
    };
    setMilestones(updatedMilestones);

    // Update contractDetails as well if needed
    const updatedContractDetails = {
      ...contractDetails,
      milestone: updatedMilestones,
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

  //   const formattedStartDate = moment(contractDetails.start_date,"YYYY-MM-DD",true);
  //   const formattedDate = moment(contractDetails.date_of_signature);

  const selectClient = async (value: string) => {
    // Fetch client data including region
    try {
      const response = await getMSA(value);
      const clientData = response.data[0];
      console.log("Client data", clientData);
      if (clientData) {
        // Update contractDetails with client data
        setContractDetails({
          ...contractDetails,
          msa_id: clientData.id,
          clientName: clientData.client_name,
          region: clientData.region,
        });
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  };
  //   console.log("Milestones-test", milestones);

  return (
    <AddContract
      contractAdded={contractAdded}
      contractType={contractType}
      selectClient={selectClient}
      handleMilestoneChange={handleMilestoneChange}
      handleSubmit={handleSubmit}
      handleFileUpload={handleFileUpload}
      handleCommentsRemarksChange={handleCommentsRemarksChange}
      handleTotalContractValueChange={handleTotalContractValueChange}
      handlePaymentPercentageChange={handlePaymentPercentageChange}
      handleAmount={handleAmount}
      removeMilestone={removeMilestone}
      handleAddMilestone={handleAddMilestone}
      handleContractTypeChange={handleContractTypeChange}
      getClientName={getClientName}
      clientNameOptions={clientNameOptions}
      contractDetails={contractDetails}
      setContractDetails={setContractDetails}
      milestones={milestones}
    />
  );
};

export default AddContractHandler;

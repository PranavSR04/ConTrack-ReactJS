import React, { useEffect, useState } from "react";
import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Menu,
} from "antd";
import {
  PlusOutlined,
  CloseCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Upload } from "antd";
import {
  Milestone,
  ContractDetails,
  RcFile,
  LocationStateProps,
  ExistingMilestone,
  //   ExistingMilestone,
} from "./types";
import styles from "./AddContract.module.css";
import "./api/api";
import dayjs from "dayjs";
import { getMSA } from "./api/getMSA";
import { AxiosResponse } from "axios";
import { addContract } from "./api/api";
import { UploadRequestOption } from "rc-upload/lib/interface"; // Import UploadRequestOption
import moment from "moment";
import Toast from "../../Components/Toast/Toast";
import { useLocation, useNavigate } from "react-router-dom";
import AddContract from "./AddContract";
import EditContract from "./EditContract";
import { editContract } from "./api/editContract";
import { getapi } from "./api/getContract";
import { EditContractDetails } from "./types/editcontract";
// import { RcFile } from "antd/lib/upload";

const EditContractHandler = () => {
  const location = useLocation();
  let { id } = location.state as LocationStateProps;
  const [contractDetails, setContractDetails] = useState<EditContractDetails>({
    msa_id: "",
    client_name: "",
    contract_ref_id: "",
    region: "",
    du: "",
    start_date: "",
    end_date: "",
    date_of_signature: "",
    contract_type: "TM",
    milestones: [
      {
        milestone_desc: "",
        milestone_enddate: null,
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
  const [existingMilestone, setExistingMilestone] = useState<
    ExistingMilestone[] 
  >([]);

  useEffect(() => {
    if (id) {
      autoFillContract(id);
    }
  }, [id]);

  const autoFillContract = async (id: string) => {
    try {
      const data = await getapi(id);

      const contractData = data?.data;
      console.log("getContract api:", contractData);
      if (contractData) {
        // console.log("Data",  contractData.data[0], contractData.data[0].contract_ref_id);
        // const {
        //   client_name,
        //   contract_ref_id,
        //   du,
        //   start_date,
        //   end_date,
        //   date_of_signature,
        //   contract_type,
        //   milestones,
        //   estimated_amount,
        // } = contractData.data[0];
        // console.log("Cname", client_name);
        // console.log("Start Date", start_date);
        // console.log("ContractRef ID", contract_ref_id);
        // console.log("du", contractDetails.du);
        setContractDetails(contractData.data[0]);
        setExistingMilestone(contractData.data[0].milestones);
      }
    } catch (error) {
      console.error("error in filling");
    }
  };
  console.log("setted existing milestones;", existingMilestone);
  const [contractAdded, setContractAdded] = useState<boolean>(false);
  const [milestones, setMilestones] = useState<ExistingMilestone[]>(
    contractDetails.milestones ||[]
  );

  const [clientNameOptions, setClientNameOptions] = useState<
    { value: string }[]
  >([]);

  const [contractPdf, setContractPdf] = useState<RcFile | null>();

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

  //   const handleAddMilestone = () => {
  //     console.log(milestones);
  //     setExistingMilestone([
  //       ...existingMilestone,
  //       {
  //         milestone_desc: "",
  //         milestone_enddate: null,
  //         percentage: null,
  //         amount: null,
  //       },
  //     ]);
  //   };
  //   const handleAddMilestone = () => {
  //     console.log(milestones);
  //     setExistingMilestone([ ...existingMilestone,
  //       {
  //         milestones: "",
  //         expectedCompletionDate: null,
  //         percentage: null,
  //         amount: null,
  //       },
  //     ]);
  //   };

  // const handleAddMilestone = () => {
  //   console.log(existingMilestone);

  //   // Convert the new format to the existing format
  //  const newMilestone = {
  //    milestone_desc: "",
  //    milestone_enddate: null,
  //    percentage: null,
  //    amount: null,
  //  };

  //   setExistingMilestone([...existingMilestone, newMilestone]);
  // };
  const handleAddMilestone = () => {
    console.log(existingMilestone);

    // Create a new milestone in the desired format
    const newMilestone = {
      milestone_desc: "",
      milestone_enddate: null,
      percentage: null,
      amount: null,
    };
    console.log(newMilestone);

    // Add the new milestone to the existingMilestone array
    setExistingMilestone([...existingMilestone, newMilestone]);
  };

  //   const removeMilestone = (index: number) => {
  //     const updatedMilestones = [...milestones];
  //     updatedMilestones.splice(index, 1);
  //     setMilestones(updatedMilestones);
  //   };
  const removeMilestone = (index: number) => {
    const updatedMilestones = [...existingMilestone];
    updatedMilestones.splice(index, 1);
    setExistingMilestone(updatedMilestones);
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
    if (value !== undefined && contractDetails.estimated_amount !== null) {
      const updatedMilestones = milestones.map((milestone, idx) => {
        if (idx === index) {
          const paymentAmount =
            (value / 100) * (contractDetails.estimated_amount ?? 0);
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
        milestones: milestones.map((milestone) => ({
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

  const handleFileUpload = (info: any) => {
    setContractDetails({
      ...contractDetails,
      file: info.file as RcFile,
    });
    console.log({ ...contractDetails, workSchedule: info.file as RcFile });
    try {
      console.log("File uploaded successfully:", info.file as RcFile);
      setContractPdf(info.file);
      console.log("setContract file:", contractDetails.file);
    } catch (e) {
      console.log("file upload error is", e);
    }
  };

  //   setContractDetails({ ...contractDetails, file: contractPdf });
  const handleUpdate = async () => {
    console.log(contractDetails);
    try {
      console.log("Updating Contract:", contractDetails);
      const updatedContractDetails: EditContractDetails = {
        ...contractDetails,

        milestones: existingMilestone,
      };
      console.log("######3", updatedContractDetails);
      await editContract(updatedContractDetails);
      console.log("Contract Updated Successfully!");
      setContractAdded(true);
      //   navigate("/allContracts");
    } catch (error: any) {
      console.error("Error editing contract:", error.message);
      // Optionally, you can set an error state or show a notification to the user
    }
  };

  //   const handleMilestoneChange = (
  //     index: number,
  //     field: string,
  //     value: string | dayjs.Dayjs | number | null
  //   ) => {
  //     console.log("index", index);
  //     console.log("filed", field);
  //     console.log("value", value);

  //     let convertedValue: Date | null = null;
  //     // Convert dayjs object to Date
  //     if (dayjs.isDayjs(value)) {
  //       convertedValue = (value as dayjs.Dayjs).toDate();
  //     }
  //     console.log("conv value", convertedValue);
  //     const updatedMilestones = [...milestones];
  //     updatedMilestones[index] = {
  //       ...updatedMilestones[index],
  //       [field]: dayjs.isDayjs(value) ? convertedValue : value,
  //     };
  //     setMilestones(updatedMilestones);

  //     // Update contractDetails as well if needed
  //     const updatedContractDetails = {
  //       ...contractDetails,
  //       milestones: updatedMilestones,
  //     };
  //     console.log(updatedContractDetails);
  //     setContractDetails(updatedContractDetails);
  //   };

  // const handleMilestoneChange = (
  //     index: number,
  //     field: string,
  //     value: string | dayjs.Dayjs | number | null
  //   ) => {
  //     console.log("index", index);
  //     console.log("field", field);
  //     console.log("value", value);

  //     let convertedValue: Date | null = null;
  //     // Convert dayjs object to Date
  //     if (dayjs.isDayjs(value)) {
  //       convertedValue = (value as dayjs.Dayjs).toDate();
  //     }
  //     console.log("converted value", convertedValue);

  //     const updatedMilestones = [...milestones];
  //     updatedMilestones[index] = {
  //       ...updatedMilestones[index],
  //       [field]: dayjs.isDayjs(value) ? convertedValue : value,
  //     };
  //     setMilestones(updatedMilestones);

  //     // Update contractDetails as well if needed
  //     const updatedContractDetails = {
  //       ...contractDetails,
  //       milestones: updatedMilestones,
  //     };
  //     console.log("updated contractDetails", updatedContractDetails);
  //     setContractDetails(updatedContractDetails);
  //   };

  const handleMilestoneChange = (
    index: number,
    field: string,
    value: string | dayjs.Dayjs | number | null
  ) => {
    console.log("index", index);
    console.log("field", field);
    console.log("value", value);

    let convertedValue: Date | null = null;
    // Convert dayjs object to Date
    if (dayjs.isDayjs(value)) {
      convertedValue = (value as dayjs.Dayjs).toDate();
    }
    console.log("converted value", convertedValue);

    const updatedMilestones = [...contractDetails.milestones];
    updatedMilestones[index] = {
      ...updatedMilestones[index],
      [field]: dayjs.isDayjs(value) ? convertedValue : value,
    };
    // Update contractDetails with the updated milestones
    const updatedContractDetails = {
      ...contractDetails,
      milestones: updatedMilestones,
    };
    console.log("updated contractDetails", updatedContractDetails);
    setContractDetails(updatedContractDetails);
  };

  console.log("setContractDetails. milestone", contractDetails.milestones);
  useEffect(() => {
    let responses;
    const fetchMSA = async () => {
      try {
        responses = await getMSA();
        // console.log("msa response", responses.data);
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
      const clientData = response.data[0];
      console.log("Client data", clientData);
      if (clientData) {
        // Update contractDetails with client data
        setContractDetails({
          ...contractDetails,
          msa_id: clientData.id,
          client_name: clientData.client_name,
          region: clientData.region,
        });
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  };

  return (
    <EditContract
      contractAdded={contractAdded}
      contractType={contractType}
      selectClient={selectClient}
      handleMilestoneChange={handleMilestoneChange}
      handleUpdate={handleUpdate}
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
      existingMilestone={existingMilestone}
    />
  );
};

export default EditContractHandler;

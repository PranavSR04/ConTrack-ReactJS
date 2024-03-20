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
import { Milestone, ContractDetails, RcFile, AssociatedMember } from "./types";
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
import { getUser } from "./api/getUser";
import { forEach } from "lodash";

// import { RcFile } from "antd/lib/upload";

// interface AddContractHandlerProps {
//   onSubmit: (data: ContractDetails) => void;
// }

const AddContractHandler = () => {
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
        expectedCompletionDate: "",
        percentage: null,
        amount: null,
      },
    ],
    assoc_users: [],
    file: null as RcFile | null,
    comments: "",
    estimated_amount: 0,
    contract_added_by: 3,
  });

  const [uploadedFile, setUploadedFile] = useState(null);

  const [contractAdded, setContractAdded] = useState<boolean>(false);
  const [milestones, setMilestones] = useState<Milestone[]>(
    contractDetails.milestone
  );
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number[]>([]);

  const [clientNameOptions, setClientNameOptions] = useState<
    { value: string }[]
  >([]);
  const [spinning, setSpinning] = React.useState<boolean>(false);
  const [userNameOptions, setUserNameOptions] = useState<AssociatedMember[]>(
    []
  );
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

  const getUserName = async () => {
    try {
      const response = await getUser();
      console.log("API RESPONSE onSearch:", response);

      // Ensure response.data is an array
      if (Array.isArray(response.data.data)) {
        //  const userNames = response.data.data.map(
        //    (item: any) => item.user_name
        //  );

        console.log("RESPONSE>DATA.DATA", response.data.data);

        const userList: AssociatedMember[] = response.data.data.map(
          (data: { user_name: string; id: number }) => ({
            label: data.user_name,
            value: data.id,
          })
        );

        console.log("userLIST AFTER MAP", userList);

        // Remove duplicate names and convert to options format
        // const uniqueOptions: { value: string }[] = Array.from(
        //   new Set(userNames)
        // ).map((name) => ({ value: name as string }));

        setUserNameOptions(userList);
        console.log("SETTED USERNAME OPTIONS", userNameOptions);
      } else {
        console.error("Invalid data format for user names. Expected an array.");
      }
    } catch (error) {
      console.error("Error fetching user names:", error);
    }
  };

  // const getUserName = async (searchValue: string) => {
  //   console.log("before try", searchValue);
  //   try {
  //     // const userList:ContractDetails["associatedMembers"]
  //     const response = await getUser(searchValue);
  //     console.log("API RESPONSE onSearch:", response);

  //     // Ensure response.data is an array
  //     if (Array.isArray(response.data.data)) {
  //       const userNames = response.data.data.map((item: any) => item.user_name);

  //       console.log("RESPONSE>DATA.DATA", response.data.data);

  //       const userList: AssociatedMember[] = response.data.data.map(
  //         (data: { user_name: string; id: number }) => ({
  //           label: data.user_name,
  //           value: data.id,
  //         })
  //       );

  //       console.log("userLIST AFTER MAP", userList);

  //       // Remove duplicate names and convert to options format
  //       // const uniqueOptions: { value: string }[] = Array.from(
  //       //   new Set(userNames)
  //       // ).map((name) => ({ value: name as string }));

  //       setUserNameOptions(userList);
  //       console.log("SETTED USERNAME OPTIONS", userNameOptions);
  //     } else {
  //       console.error("Invalid data format for user names. Expected an array.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user names:", error);
  //   }
  // };

  const [contractType, setContractType] = useState<string | null>(null);

  const handleContractTypeChange = (value: "FF" | "TM") => {
    setContractDetails({
      ...contractDetails,
      contract_type: value,
    });
    setContractType(value);
  };

  const [fileList, setFileList] = useState<any>();

  const handleAddMilestone = () => {
    setMilestones([
      ...milestones,
      {
        milestones: "",
        expectedCompletionDate: "",
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

  const [newMilestoneAmount, setNewMilestoneAmount] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const handlePaymentPercentageChange = (
    index: number,
    value: number | undefined
  ) => {
    if (value !== undefined && contractDetails.estimated_amount !== null) {
      const paymentAmount =
        (value / 100) * (contractDetails.estimated_amount ?? 0);
      const updatedMilestones = milestones.map((milestone, idx) => {
        if (idx === index) {
          // console.log("consoled amount", paymentAmount)
          return {
            ...milestone,
            percentage: value,
            amount: paymentAmount,
          };
        } else return milestone;
      });

      setMilestones(updatedMilestones);
      console.log("updatedMilestones", updatedMilestones);

      // Also update the contractDetails if needed
      const updatedContractDetails = {
        ...contractDetails,
        milestone: updatedMilestones,
      };

      setAmount(paymentAmount);
      setContractDetails(updatedContractDetails);
      console.log("new check milestone amount", amount);
      console.log("updatedContractDetails", updatedContractDetails);
    }
  };

  useEffect(() => {
    console.log("new check milestone amount", newMilestoneAmount);
    setNewMilestoneAmount(amount);
  }, [amount]);

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
    let value = e.target.value;
    if (value.length > 200) {
      value = value.slice(0, 200);
    }
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
      setFileList(info.file);
    } catch (e) {
      console.log("file upload error", e);
    }
  };

  const handleSubmit = async () => {
    // onSubmit(contractDetails);

    try {
      setSpinning(true);
      await addContract(contractDetails);

      setContractAdded(true);
      console.log("Navigating from");
      navigate("/AllContracts", {
        state: { added: contractAdded as boolean },
      });
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
    getUserName();
  }, []);

  useEffect(() => {
    let responses;
    const fetchUser = async () => {
      try {
        responses = await getUser();
        console.log("User response", responses.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
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
          clientName: clientData.client_name,
          region: clientData.region,
        });
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  };
  let updatedAssocMembers: any = [];
  const selectUser = (data: AssociatedMember) => {
    // try {
    //   const response = await getUser(value);
    //   const userData = response.data[0];
    //   console.log("User data", userData);
    //   if (userData) {
    //     // Update contractDetails with user_id in associatedMembers
    //     const updatedAssocMembers = [
    //       ...contractDetails.associatedMembers,
    //       { user_id: userData.user_id },
    //     ];

    //     setContractDetails({
    //       ...contractDetails,
    //       associatedMembers: updatedAssocMembers,
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error fetching user data:", error);
    // }
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        console.log("Key:", key);
        console.log("Value:", value);

        if (
          !contractDetails.assoc_users.some((user) => user.user_id === value)
        ) {
          const updatedAssoc = [
            ...contractDetails.assoc_users,
            { user_id: value },
          ];
          updatedAssocMembers = [...updatedAssocMembers, ...updatedAssoc];
        } else {
          console.log("Skipping duplicate value:", value);
        }
      });
      // console.log("SELECT DATA", typeof data, "actual value:", data);
      // const updatedAssoc = [...contractDetails.assoc_users, { user_id: data }];

      // updatedAssocMembers = [...updatedAssocMembers, ...updatedAssoc];

      console.log("UpdatedAssoc", updatedAssocMembers);

      setContractDetails({
        ...contractDetails,
        assoc_users: updatedAssocMembers,
      });
      // const updatedEmployeeIds = data.map((option) => option.user_id);
      // console.log("SELECTED EMPLOYEE IDS:", updatedEmployeeIds);

      // Update selectedEmployeeId with new array of user_ids
      // setSelectedEmployeeId((prevIds) => [...prevIds, data]);
      // console.log("ASSOC USER ARRAY", selectedEmployeeId);
      // const extractedId = data[0].user_id;
      // console.log("EXTRACTEDD Employee ID :", extractedId);
      // setSelectedEmployeeId(data[0].user_id);
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
      getUserName={getUserName}
      selectUser={selectUser}
      userNameOptions={userNameOptions}
      contractDetails={contractDetails}
      setContractDetails={setContractDetails}
      milestones={milestones}
      spinning={spinning}
      // fileList={fileList}
    />
  );
};

export default AddContractHandler;

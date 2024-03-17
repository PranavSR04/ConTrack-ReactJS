import React, { useEffect, useState } from "react";
import { HandlerPropType } from "../Header/types";
import { useNavigate } from "react-router";
import { postCloseContract } from "../api/postCloseContract";
import {
  CloseContractHandlerPropType,
  CloseContractHandlerType,
} from "./types";
import CloseContract from "./CloseContract";

const CloseContractHandler = ({
  responses,
  id,
}: CloseContractHandlerPropType) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [contractStatus, setContractStatus] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("response in Header Handler", responses);
    getContractStatus(responses);
  }, [responses]);

  const getContractStatus: CloseContractHandlerType["getContractStatus"] = (
    responses
  ) => {
    if (responses && responses.data && responses.data.length > 0) {
      // console.log("addendum", responses.data[0].addendum)
      setContractStatus(responses.data[0].contract_status);
    }
  };

  const onCancel = () => {
    setVisible(false);
  };

  const modalPopUp = () => {
    setVisible(true);
  };

  const closeContract = async () => {
    // console.log("closed");
    try {
      await postCloseContract(id);
      console.log("Closed contract with id:", id);
    } catch (error) {
      // Handle any other unexpected errors here
      console.error("Error in closing contract:", error);
    } finally {
      // Close the modal
      onCancel();
      navigate("/All Contracts");
    }
  };
  return (
    <div>
      <CloseContract
        visible={visible}
        onCancel={onCancel}
        closeContract={closeContract}
        modalPopUp={modalPopUp}
        contractStatus={contractStatus}
      />
    </div>
  );
};

export default CloseContractHandler;

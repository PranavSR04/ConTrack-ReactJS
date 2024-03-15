import React, { useEffect, useState } from "react";
import Documents from "./Documents";
import { getContractData } from "../FixedFee/api/getContractData";
import { DocumentsHandlerType } from "./types";
import { Addendum, LocationStateProps } from "../FixedFee/types";
import { postCloseContract } from "./api/postCloseContract";
import { useNavigate } from "react-router";

const DocumentsHandler = ({ id }: LocationStateProps) => {
  const [contractDocuments, setContractDocuments] = useState<string>("");
  const [contractRefId, setContractRefId] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [addendums, setAddendums] = useState<Addendum[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [contractStatus, setContractStatus] = useState<string>("")
  const navigate = useNavigate()

  useEffect(() => {
    let responses;
    const fetchData = async () => {
      try {
        responses = await getContractData(id);
        console.log("Contracts response: ", responses);
        getContractDocuments(responses);
        setLoading(false);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchData();
  }, []);

  const getContractDocuments: DocumentsHandlerType["getContractDocuments"] = (
    responses
  ) => {
    if (responses && responses.data && responses.data.length > 0) {
      // console.log("addendum", responses.data[0].addendum)
      setContractDocuments(responses.data[0].contract_doclink);
      setClientName(responses.data[0].client_name);
      setContractRefId(responses.data[0].contract_ref_id);
      setAddendums(responses.data[0].addendum);
      setContractStatus(responses.data[0].contract_status);
    }
  };

  const onCancel = () => {
    setVisible(false);
  };

  const modalPopUp = () =>{
    setVisible(true)
  }
  const closeContract = async () => {
    // console.log("closed");
    try {
      await postCloseContract(id);
      console.log("Closed contract with id:", id);
    } catch (error) {
      // Handle any other unexpected errors here
      console.error('Error in closing contract:', error);
    } finally {
      // Close the modal
      onCancel();
      navigate('/AllContracts')
    }
  };

  return (
    <div>
      <Documents
        contractDocuments={contractDocuments}
        contractRefId={contractRefId}
        clientName={clientName}
        loading={loading}
        addendums={addendums}
        visible={visible}
        modalPopUp={modalPopUp}
        onCancel={onCancel}
        closeContract={closeContract}
        contractStatus={contractStatus}
      />
    </div>
  );
};

export default DocumentsHandler;

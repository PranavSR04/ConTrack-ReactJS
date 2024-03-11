import React, { useEffect, useState } from "react";
import Header from "./Header";
import { getContractData } from "../FixedFee/api/getContractData";
import { HeadingHandlerType } from "./types";

const HeaderHandler = () => {
  const [error, setError] = useState<string>("");
  const [contractRefId, setContractRefId] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [du, setDU] = useState<string>("");
  const [contractStatus, setContractStatus] = useState<string>("");

  useEffect(() => {
    let responses;
    const fetchData = async () => {
      try {
        responses = await getContractData();
        // console.log(responses);
        getContractHeading(responses);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchData();
  }, []);

  const getContractHeading: HeadingHandlerType['getContractHeading']=(responses)=>{
    if (responses && responses.data && responses.data.length > 0){
        setContractRefId(responses.data[0].contract_ref_id);
        setClientName(responses.data[0].client_name)
        setDU(responses.data[0].du)
        setContractStatus(responses.data[0].contract_status)
        setRegion(responses.data[0].region)
    } else{
        setError("Failed to get response")
    }
  }
  
  return (
    <>
      <Header 
      contractRefId={contractRefId}
      clientName={clientName}
      region={region}
      du={du}
      contractStatus={contractStatus} />
    </>
  );
};

export default HeaderHandler;

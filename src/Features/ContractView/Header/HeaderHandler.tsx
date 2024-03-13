import React, { useEffect, useState } from "react";
import Header from "./Header";
import { getContractData } from "../FixedFee/api/getContractData";
import { HeadingHandlerType } from "./types";
import { Contract, ContractApiType, LocationStateProps } from "../FixedFee/types";

const HeaderHandler = ({id}:LocationStateProps) => {
  const [error, setError] = useState<string>("");
  const [contractRefId, setContractRefId] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [du, setDU] = useState<string>("");
  const [contractStatus, setContractStatus] = useState<string>("");
  const [contractData, setContractData] = useState<Contract[]|undefined>();

  useEffect(() => {
    let responses;
    const fetchData = async (id:string) => {
      // try {
      //   responses = await getContractData(id);
      //   console.log(responses.data)
      //   // console.log("head response",responses.data[0]);
      //   // const responseDataArray = [responses.data[0]];
      //   // setContractData(responseDataArray)
      //   // getContractHeading(responses);
      // } catch (error) {
      //   console.log("Error: ", error);
      // }
      try {
        const responses = await getContractData(id);
        getContractHeading(responses);
        if ('data' in responses) {
          console.log(responses.data[0]); // Only access data if it exists
          const responseDataArray = [responses.data[0]];
          setContractData(responseDataArray); // Assuming your API response has a 'data' property containing the array of contracts
        } else {
          console.error('Error fetching contract data:', responses); // Log the error response
        }
      } catch (error) {
        console.error('Error fetching contract data:', error);
      }
      
    };
    fetchData(id);
  }, [id]);

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
      contractStatus={contractStatus}
      contractData={contractData} 
      />
    </>
  );
};

export default HeaderHandler;

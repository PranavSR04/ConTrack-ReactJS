import React, { useEffect, useState } from 'react'
import Documents from './Documents'
import { getContractData } from '../FixedFee/api/getContractData';
import { DocumentsHandlerType } from './types';
import { Addendum } from '../FixedFee/types';

const DocumentsHandler = ({id}:any) => {
    const [contractDocuments, setContractDocuments] = useState<string>("");
    const [contractRefId, setContractRefId] = useState<string>("");
    const [clientName, setClientName] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true);
    const [addendums, setAddendums] = useState<Addendum[]>([]);
  
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
      }
    };
    
  return (
    <div>
      <Documents contractDocuments={contractDocuments} contractRefId={contractRefId} clientName={clientName} loading={loading} addendums={addendums}/>
    </div>
  )
}

export default DocumentsHandler

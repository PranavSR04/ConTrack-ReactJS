import React, { useEffect, useState } from "react";
import Header from "./Header";
import { getContractData } from "../FixedFee/api/getContractData";
import { HeadingHandlerType } from "./types";
import {
  Contract,
  ContractApiType,
  LocationStateProps,
} from "../FixedFee/types";

const HeaderHandler = ({ id }: LocationStateProps) => {
  const [error, setError] = useState<string>("");
  const [contractRefId, setContractRefId] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [du, setDU] = useState<string>("");
  const [contractStatus, setContractStatus] = useState<string>("");
  const [contractExcelData, setContractExcelData] = useState<(string | number)[][]>([]);

  // const [contractData, setContractData] = useState<Contract[]>([]);
  useEffect(() => {
    let responses;
    const fetchData = async (id: string) => {
      try {
        const responses = await getContractData(id);
        getContractHeading(responses);
        if ("data" in responses) {
          console.log(responses.data[0]);
          // const dataArray = Object.values(responses.data[0]);
          // console.log("dataArray", dataArray);

          const responseDataArray = [responses.data[0]];
          // setContractData(responseDataArray);
          let dataWithHeaders = [];

          const dataArray = responseDataArray.map((item) => {
            const row = [
              item.id,
              item.msa_id,
              item.contract_added_by,
              item.contract_ref_id,
              item.contract_type,
              item.date_of_signature,
              item.comments,
              item.start_date,
              item.end_date,
              item.du,
              item.contract_doclink,
              item.estimated_amount,
              item.contract_status,
              item.created_at,
              item.updated_at,
              item.client_name,
              item.user_name,
            ];

            // Check if milestones exist
            if (item.milestones) {
              item.milestones.forEach((milestone) => {
                const milestoneRow = [...row]; // Create a copy of the original row
                milestoneRow.push(
                  milestone.id,
                  milestone.contract_id,
                  milestone.milestone_desc,
                  milestone.milestone_enddate,
                  milestone.percentage,
                  milestone.amount
                );
                dataWithHeaders.push(milestoneRow); // Push the new row for the milestone
              });
            } else {
              // Push empty values for milestones if they don't exist
              row.push("", "", "", "", "", "");
              dataWithHeaders.push(row); // Push the original row with empty milestone values
            }

            return row;
          });

          // Prepend the column headers to the dataArray
          dataWithHeaders.unshift([
            "ID",
            "MSA ID",
            "Added By",
            "Reference ID",
            "Contract Type",
            "Signature Date",
            "Comments",
            "Start Date",
            "End Date",
            "DU",
            "Document Link",
            "Estimated Amount",
            "Status",
            "Created At",
            "Updated At",
            "Client Name",
            "User Name",
            "Region",
            "Milestone ID",
            "Milestone Contract ID",
            "Milestone Description",
            "Milestone End Date",
            "Milestone Percentage",
            "Milestone Amount"
          ]);

          console.log(dataWithHeaders);

          setContractExcelData(dataWithHeaders);
        } else {
          console.error("Error fetching contract data:", responses); // Log the error response
        }
      } catch (error) {
        console.error("Error fetching contract data:", error);
      }
    };
    fetchData(id);
  }, [id]);

  const getContractHeading: HeadingHandlerType["getContractHeading"] = (
    responses
  ) => {
    if (responses && responses.data && responses.data.length > 0) {
      setContractRefId(responses.data[0].contract_ref_id);
      setClientName(responses.data[0].client_name);
      setDU(responses.data[0].du);
      setContractStatus(responses.data[0].contract_status);
      setRegion(responses.data[0].region);
    } else {
      setError("Failed to get response");
    }
  };

  return (
    <>
      <Header
        contractRefId={contractRefId}
        clientName={clientName}
        region={region}
        du={du}
        contractStatus={contractStatus}
        contractExcelData={contractExcelData}
      />
    </>
  );
};

export default HeaderHandler;

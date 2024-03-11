import React, { useEffect, useState } from "react";
import OverviewPayment from "./OverviewPayment";
import { getContractData } from "../FixedFee/api/getContractData";
import { OverviewHandlerType } from "./types";

const OverviewPaymentHandler = () => {
  const [dateOfSignature, setDateOfSignature] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [contractType, setContractType] = useState<string>("");
  const [estimatedAmount, setEstimatedAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let responses;
    const fetchData = async () => {
      try {
        responses = await getContractData();
        getOverview(responses);
        setLoading(false);
        // setTimeout(() => {
        //     setLoading(false);
        // }, 100);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchData();
  }, []);

  const getOverview: OverviewHandlerType["getOverview"] = (responses) => {
    if (responses && responses.data && responses.data.length > 0) {
      // Converting "yyyy-mm-dd" into "dd-mm-yyyy" format
      let originalDate = responses.data[0].date_of_signature;
      let parts = originalDate.split("-");
      let formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      setDateOfSignature(formattedDate);

      originalDate = responses.data[0].start_date;
      parts = originalDate.split("-");
      formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      setStartDate(formattedDate);

      originalDate = responses.data[0].end_date;
      parts = originalDate.split("-");
      formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      setEndDate(formattedDate);

      setContractType(responses.data[0].contract_type);
      setEstimatedAmount(responses.data[0].estimated_amount);
    } else {
      setError("Failed to get response");
    }
  };

  return (
    <>
      <OverviewPayment
        dateOfSignature={dateOfSignature}
        startDate={startDate}
        endDate={endDate}
        contractType={contractType}
        estimatedAmount={estimatedAmount}
        loading={loading}
      />
    </>
  );
};

export default OverviewPaymentHandler;

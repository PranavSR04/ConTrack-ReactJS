import React, { useState } from "react";
import AddContractHandler from "./AddContractHandler";
import { ContractDetails } from "./types/AddContractTypes";

const AddContract: React.FC = () => {
  const [contractType, setContractType] = useState<string | null>(null);

  const handleSubmit = (data: ContractDetails) => {
    // Handle the form submission data
    console.log("Form Data:", data);
    // You can make API calls, dispatch actions, etc. here
  };

  return (
    <>
      <div className="container">
        <h1 style={{ marginLeft: "14rem", paddingTop: "2rem" }}>
          Add Contract
        </h1>
        <AddContractHandler onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default AddContract;

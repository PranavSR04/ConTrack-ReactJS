import React, { useState } from "react";
import AddContractHandler from "./AddContractHandler";

const AddContract: React.FC = () => {
  const [contractType, setContractType] = useState<string | null>(null);

  const handleSubmit = (data: any) => {
    // Handle the form submission data
    console.log("Form Data:", data);
    // You can make API calls, dispatch actions, etc. here
  };

  return (
    <>
      <div className="container">
        <h1>Add Contract</h1>
        <AddContractHandler onSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default AddContract;

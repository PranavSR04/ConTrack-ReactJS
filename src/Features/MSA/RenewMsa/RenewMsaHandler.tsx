import React, { useEffect, useState } from "react";
import RenewMsa from "./RenewMsa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getapi } from "../EditMsa/api/getapi";
import { LocationStateProps } from "./types";
import { Moment } from "moment";
import moment from "moment";
import { postRenewMsa } from "./api/postRenewMsa";
import { Form } from "antd";

const RenewMsaHandler = () => {
  const { msa_ref_id } = useParams<string>();
  const user_id: number = parseInt(localStorage.getItem("user_id") || "0");
  const [form] = Form.useForm();
  const [fileName, setFileName] = useState<string>();
  const [visible, setVisible] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  // const { msa_ref_id }= location.state as LocationStateProps;
  // console.log("Id:", msa_ref_id)

  const [msaData, setMsaData] = useState({
    client_name: "",
    region:"",
    start_date: "",
    end_date: "",
    comments: "",
  });

  const [formData, setFormData] = useState({
    client_name: "",
    region:"",
    start_date: "",
    end_date: "",
    comments: "",
    file:null as File | null
  });

  useEffect(() => {
    if (msa_ref_id) {
      autoFillMsa(msa_ref_id);
    }
  }, []);

  const autoFillMsa = async (msa_ref_id: string) => {
    try {
      const responses = await getapi(msa_ref_id);
      console.log("renew msa response", responses);
      const msa_data = responses?.data;
      if (msa_data) {
        const { client_name, region, start_date, end_date, comments } = msa_data;
        // Log the extracted values for debugging
        console.log("Destructured msa values:", {
          client_name,
          region,
          start_date,
          end_date,
          comments
        });

        // Updating state with the extracted msa values
        setMsaData({
          client_name:client_name,
          region: region,
          start_date: start_date,
          end_date: end_date,
          comments: comments
        });
        
        console.log("setted MSA:", msaData);
      }
    } catch (error) {
      console.error("Error generating MSA data:", error);
    }
  };

  useEffect(() => {
    setFormData({
      client_name: msaData.client_name,
      region: msaData.region,
      start_date: msaData.start_date,
      end_date: msaData.end_date,
      comments: msaData.comments,
      file:null as File | null
    });
  }, [msaData]);

  const submitRenewMsa = async () => {
    // Checking if form is filled before submission
    if (!isFormFilled()) {
      window.alert('Please fill all required fields before submitting the form.');
    }

    try {
      console.log("After setting", formData);
      const formDatatoSend = new FormData();

      formDatatoSend.append("client_name", formData.client_name);
      formDatatoSend.append("region", formData.region);
      formDatatoSend.append("start_date",formData.start_date);
      formDatatoSend.append("end_date",formData.end_date);
      formDatatoSend.append("comments", formData.comments);
      formDatatoSend.append('file', formData.file||'');
      // Send the changed values to the API
      await postRenewMsa(msa_ref_id, user_id, formDatatoSend);

      form.resetFields();
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
    finally {
      // Close the modal
      onCancel();
      navigate('/msa')
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log("typing: ", name ,"and", value)
    setMsaData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleStartDateChange = (
    date: Moment | null,
    dateString: string | string[]
  ) => {
    console.log("datestring:", dateString);
    if (typeof dateString === "string") {
      setMsaData({ ...msaData, start_date: dateString });
    } else {
      console.log("error ; type of date string: ", typeof dateString);
    }
  };
  const handleEndDateChange = (
    date: Moment | null,
    dateString: string | string[]
  ) => {
    console.log("check end date", date);
    if (typeof dateString === "string") {
      setMsaData({ ...msaData, end_date: dateString });
    } else {
      console.log("error ; type of date string: ", typeof dateString);
    }
  };
  const handleFileUpload = (info: any) => {
    try {
      console.log("File uploaded successfully:", info.file);
      setFormData({...formData,file:info.file})
      setFileName(info.file.name);
    } catch (e) {
      console.log("file upload error is", e);
    }
  };

  const onCancel = () => {
    setVisible(false);
  };

  const modalPopUp = () =>{
    setVisible(true)
  }

  const isFormFilled = () => {
    return (
      formData.client_name !== '' &&
      formData.region !== '' &&
      formData.start_date !== null && // Assuming start_date is required and a Date object
      formData.end_date !== null && // Assuming end_date is required and a Date object
      formData.file !== null && // Assuming file upload is required
      formData.comments !== ''
    );
  };

  return (
    <div>
      <RenewMsa
        msa_ref_id={msa_ref_id}
        handleInputChange={handleInputChange}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        fileName={fileName}
        handleFileUpload={handleFileUpload}
        submitRenewMsa={submitRenewMsa}
        region={msaData.region}
        visible={visible}
        onCancel={onCancel}
        modalPopUp={modalPopUp}
        isFormFilled={isFormFilled}
      />
    </div>
  );
};

export default RenewMsaHandler;

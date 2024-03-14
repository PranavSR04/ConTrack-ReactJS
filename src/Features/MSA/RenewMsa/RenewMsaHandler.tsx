import React, { useEffect, useState } from "react";
import RenewMsa from "./RenewMsa";
import { useLocation, useParams } from "react-router-dom";
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

  const location = useLocation();
  // const { msa_ref_id }= location.state as LocationStateProps;
  // console.log("Id:", msa_ref_id)

  const [msaData, setMsaData] = useState({
    client_name: "",
    start_date: "",
    end_date: "",
    comments: "",
  });

  const [formData, setFormData] = useState({
    client_name: "",
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
        const { client_name, start_date, end_date } = msa_data;

        // Log the extracted values for debugging
        console.log("Destructured msa values:", {
          client_name,
          start_date,
          end_date,
        });

        // Updating state with the extracted msa values
        setMsaData((prevState) => ({
          ...prevState,
          client_name: client_name,
          start_date: start_date,
          end_date: end_date,
        }));
        console.log("setted MSA:", msaData);
      }
    } catch (error) {
      console.error("Error generating MSA data:", error);
    }
  };

  useEffect(() => {
    setFormData({
      client_name: msaData.client_name,
      start_date: msaData.start_date,
      end_date: msaData.end_date,
      comments: msaData.comments,
      file:null as File | null
    });
  }, [msaData]);

  const submitRenewMsa = async () => {
    try {
      console.log("After setting", formData);
      const formDatatoSend = new FormData();

      formDatatoSend.append("client_name", formData.client_name);
      formDatatoSend.append(
        "start_date",
        moment(formData.start_date).format("YYYY-MM-DD")
      );
      formDatatoSend.append(
        "end_date",
        moment(formData.end_date).format("YYYY-MM-DD")
      );
      formDatatoSend.append("comments", formData.comments);
      formDatatoSend.append('file', formData.file||'');
      // Send the changed values to the API
      await postRenewMsa(msa_ref_id, user_id, formDatatoSend);

      form.resetFields();
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMsaData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleStartDateChange = (
    date: Moment | null,
    dateString: string | string[]
  ) => {
    console.log("datestring:", date);
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
      />
    </div>
  );
};

export default RenewMsaHandler;

import React, { createContext, useEffect, useState } from "react";
import RenewMsa from "./RenewMsa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getapi } from "../EditMsa/api/getapi";
import { LocationStateProps } from "./types";
import { Moment } from "moment";
import moment from "moment";
import { postRenewMsa } from "./api/postRenewMsa";
import { Form } from "antd";
import { RcFile } from "antd/es/upload";

const RenewMsaHandler = () => {
  const user_id: number = parseInt(localStorage.getItem("user_id") || "0");
  const [form] = Form.useForm();
  const [fileName, setFileName] = useState<string>();
  const [visible, setVisible] = useState<boolean>(false);
  const [spinning, setSpinning] = React.useState<boolean>(false);
  const [filePdf, setFilePdf] = useState<RcFile | null>();
  const [msaRenewed, setMsaRenewed] = useState<boolean>(false)

  const navigate = useNavigate();
  const location = useLocation();
  const { msa_ref_id }= location.state as LocationStateProps;
  console.log("Id:", msa_ref_id)

  const [msaData, setMsaData] = useState({
    client_name: "",
    region: "",
    start_date: "",
    end_date: "",
    comments: "",
  });

  const [formData, setFormData] = useState({
    client_name: "",
    region: "",
    start_date: "",
    end_date: "",
    comments: "",
    file: null as RcFile | null,
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
        const { client_name, region, start_date, end_date, comments } =
          msa_data;
        // Log the extracted values for debugging
        console.log("Destructured msa values:", {
          client_name,
          region,
          start_date,
          end_date,
          comments,
        });

        // Updating state with the extracted msa values
        setMsaData((prevState) => ({
          ...prevState,
          client_name: client_name,
          region: region,
          start_date: start_date,
          end_date: end_date,
          comments: comments,
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
      region: msaData.region,
      start_date: msaData.start_date,
      end_date: msaData.end_date,
      comments: msaData.comments,
      file: null as RcFile | null,
    });
    console.log("useeffect formdata", formData);
    if (formData.file !== null) {
      setFilePdf(formData.file);
      console.log("filepdf:", filePdf);
      // setMsaRenewed(true)
    }
  }, [msaData, 
  ]);

  const handleFileUpload = (info: any) => {
    setFormData({ ...formData, file: info.file as RcFile });
    console.log("setting form data file", formData.file);
    try {
      console.log("File uploaded successfully:", info.file);

      setFilePdf(info.file);
      console.log(filePdf);
      setFileName(info.file.name);
    } catch (e) {
      console.log("file upload error is", e);
    }
  };

  const submitRenewMsa = async () => {
    try {
      // Checking if form is filled before submission
      const formstatus = isFormFilled();
      if (formstatus) {
        window.alert(
          "Please fill all required fields before submitting the form."
        );
      } else {
        setSpinning(true);
        console.log("After setting", formData);
        console.log("file testing:", filePdf);
        const formDatatoSend = new FormData();
        formDatatoSend.append("client_name", formData.client_name);
        formDatatoSend.append("region", formData.region);
        formDatatoSend.append("start_date", formData.start_date);
        formDatatoSend.append("end_date", formData.end_date);
        formDatatoSend.append("comments", formData.comments);
        formDatatoSend.append("file", filePdf || "");

        // Sending the changed values to the API
        await postRenewMsa(msa_ref_id, user_id, formDatatoSend).then(() => {
          // Only set msaRenewed to true if the API call succeeds
          setMsaRenewed(true);
          console.log("msaRenewed is now true");
      })
      .catch((error) => {
          console.error("Error submitting form data:", error);
          window.alert("Error occurred while submitting the form. Please try again.");
      });
        // setMsaRenewed(true);
        setSpinning(false);
        navigate("/msa");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      setSpinning(false);
      navigate("/msa");
    } finally {
      // Close the modal
      onCancel();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log("typing: ", name, "and", value);
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

  const onCancel = () => {
    setVisible(false);
  };

  const modalPopUp = () => {
    setVisible(true);
  };

  const isFormFilled = () => {
    console.log("test", fileName);
    console.log("test clent name", formData.client_name);
    if (
      formData.client_name == "" ||
      formData.region == "" ||
      formData.start_date == "" ||
      formData.end_date == "" ||
      fileName == null
    ) {
      return true;
    } else {
      return false;
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
        region={msaData.region}
        clientName={msaData.client_name}
        visible={visible}
        onCancel={onCancel}
        modalPopUp={modalPopUp}
        spinning={spinning}
        msaRenewed={msaRenewed}
      />
    </div>
  );
};

export default RenewMsaHandler;

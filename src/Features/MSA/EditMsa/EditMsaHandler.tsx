import React, { useEffect, useState } from "react";
import EditMsa from "./EditMsa";
import { useParams } from "react-router";
import { MsaDataType } from "./types";
import axios from "axios";
import moment, { Moment } from "moment";
import { Form } from "antd";
import { postapi } from "./api/postapi";

const EditMsaHandler = () => {
  const { msa_ref_id } = useParams();
  const [form] = Form.useForm();

  console.log(msa_ref_id);
  const [msaData, setMsaData] = useState({
    client_name: "",
    region: "",
    start_date: "",
    end_date: "",
  });
  const [formData, setFormData] = useState({
    msa_ref_id: '',
    client_name: '',
    region: '',
    start_date: null as Moment | null,
    end_date: null as Moment | null,
    comments: '',
  });
  useEffect(() => {
    if (msa_ref_id) {
      autoFillMsa(msa_ref_id);
    }
  }, []);
  const getMsaData = async (msa_ref_id: string) => {
    try {
      const data = await axios.get(
        `http://127.0.0.1:8000/api/msa/list?msa_ref_id=${msa_ref_id}`
      );
      console.log(data.data);
      return data;
    } catch (error) {
      console.error("Error fetching MSA data:", error);
      return null;
    }
  };
  const autoFillMsa = async (msa_ref_id: string) => {
    try {
      const data = await getMsaData(msa_ref_id);
      const msa_data = data?.data;
      console.log("MSA from api::", msa_data);
      if (msa_data) {
        const { client_name, region, start_date, end_date } = msa_data;
         const formattedStartDate = moment(msaData.start_date, 'DD-MM-YYYY');
         const formattedEndDate = moment(msaData.end_date, 'DD-MM-YYYY');
        // Log the extracted values for debugging
        console.log("Extracted values:", {
          client_name,
          region,
          start_date,
          end_date,
        });

        // Updating state with the extracted values
        setMsaData((prevState) => ({
          ...prevState,
          client_name: client_name,
          region: region,
          start_date: start_date, // Keeping as string
          end_date: end_date, // Keeping as string
        }));

        // Now, to log the updated state correctly, use a useEffect hook
        // useEffect(() => {
        //   console.log("Updated msaData:", msaData);
        // }, [msaData]); //
      }
    } catch (error) {
      console.error("Error generating MSA ID:", error);
    }
  
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });
    setMsaData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Moment | null, dateString: string | string[]) => {
    if (typeof dateString === 'string') {
      setFormData({ ...formData, start_date: date });
    } else {
      setFormData({ ...formData, start_date: moment(dateString[0]) });
    }
  };
  
  const handleEndDateChange = (date: Moment | null, dateString: string | string[]) => {
    if (typeof dateString === 'string') {
      setFormData({ ...formData, end_date: date });
    } else {
      setFormData({ ...formData, end_date: moment(dateString[0]) });
    }
  };

  console.log(formData)
  const SubmitAddMsa=async()=>{
    try {
      const formDatatoSend = new FormData();
      formDatatoSend.append('msa_ref_id', formData.msa_ref_id);
      formDatatoSend.append('client_name', formData.client_name);
      formDatatoSend.append('region', formData.region);
      
      // Format start_date and end_date
      formDatatoSend.append('start_date', moment(formData.start_date).format('YYYY-MM-DD'));
      formDatatoSend.append('end_date', moment(formData.end_date).format('YYYY-MM-DD'));
      
      formDatatoSend.append('comments', formData.comments);
      await postapi(formDatatoSend);
  
      form.resetFields();
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  }
  console.log(msaData)
  console.log(msa_ref_id)
  return (
    
    <div>
      <EditMsa 
      handleInputChange={handleInputChange}
      handleDateChange={handleDateChange}
      handleEndDateChange={handleEndDateChange}
      SubmitAddMsa={SubmitAddMsa}
      msa_ref_id={msa_ref_id||""}
      msaData={msaData} />
    </div>
  );
};

export default EditMsaHandler;

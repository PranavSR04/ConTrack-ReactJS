import React, { useEffect, useState } from "react";
import EditMsa from "./EditMsa";
import { useParams } from "react-router";
import { MsaDataType } from "./types";
import axios from "axios";
import moment, { Moment } from "moment";
import { Form } from "antd";
import { postapi } from "./api/postapi";
import { getapi } from "./api/getapi";

const EditMsaHandler = () => {
  const { msa_ref_id } = useParams<string >();
  const [form] = Form.useForm();

  console.log(msa_ref_id);
  const [msaData, setMsaData] = useState({
    client_name: "",
    region: "",
    start_date:null as Moment|null,
    end_date:null as Moment | null,
    comments:""
  });

  const [formData, setFormData] = useState({
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

  const autoFillMsa = async (msa_ref_id: string) => {
    try {
      const data = await getapi(msa_ref_id);
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


      }
    } catch (error) {
      console.error("Error generating MSA ID:", error);
    }
  
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMsaData(prevState => ({
      ...prevState,
      [name]: value,
    }));

  };
  const handleDateChange = (date: Moment | null, dateString: string | string[]) => {
    if (typeof dateString === 'string') {
      setMsaData({ ...formData, start_date: date });
    } else {
      setMsaData({ ...formData, start_date: moment(dateString[0]) });
    }
  };
  const handleEndDateChange = (date: Moment | null, dateString: string | string[]) => {
    console.log("check end date",formData)
    if (typeof dateString === 'string') {
      setFormData({ ...formData, end_date: date });
    } else {
      setFormData({ ...formData, end_date: moment(dateString[0]) });
    }
  };
 
  console.log("Msa data when edited",msaData)
  console.log("form data before setting",formData)
  useEffect(() => {
    setFormData({
      client_name: msaData.client_name,
      region: msaData.region,
      start_date: msaData.start_date,
      end_date: msaData.end_date,
      comments: msaData.comments,
    });
  }, [msaData]);
  const SubmitEditMsa=async()=>{
    try {

      console.log('After setting',formData)
      const formDatatoSend = new FormData();

      formDatatoSend.append('client_name', formData.client_name);

      formDatatoSend.append('region', formData.region);

      formDatatoSend.append('start_date', moment(formData.start_date).format('YYYY-MM-DD'));

      formDatatoSend.append('end_date', moment(formData.end_date).format('YYYY-MM-DD'));

      formDatatoSend.append('comments', formData.comments);
     

    // Send only the changed values to the API
    await postapi(formDatatoSend,msa_ref_id);
      // await postapi(formDatatoSend);
  
      form.resetFields();
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  }
  console.log(msaData)
  console.log("Edit MSA Ref",msa_ref_id)
  return (
    
    <div>
      <EditMsa 
      handleInputChange={handleInputChange}
      handleDateChange={handleDateChange}
      handleEndDateChange={handleEndDateChange}
      msa_ref_id={msa_ref_id||""}
      msaData={msaData} 
      SubmitEditMsa={SubmitEditMsa}/>
    </div>
  );
};

export default EditMsaHandler;

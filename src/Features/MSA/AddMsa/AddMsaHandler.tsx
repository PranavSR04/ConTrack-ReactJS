import React, { useContext, useEffect, useState } from 'react'
import AddMsa from './AddMsa'
import { Form, message } from 'antd';
import moment, { Moment } from 'moment';
import { getapi } from './api/getapi';
import { postapi } from './api/postapi';
import { useNavigate } from 'react-router';
import { NavContexts } from '../../../Components/NavContext/NavContext';
import { RcFile } from 'antd/es/upload';

const AddMsaHandler = () => {
  const user_id: number = parseInt(localStorage.getItem('user_id') || "0");
    const [form] = Form.useForm();
    const navigate=useNavigate();
    const[msaAdded,setMsaAdded]=useState<boolean>(false);
    const [spinning, setSpinning] = React.useState<boolean>(false);
    const maxSize = 10 * 1024 * 1024;
    const [msaRefId,setMsaRefId]=useState<string>();
    const [fileName,setFileName]=useState<string>();
    const [isModalVisible, setIsModalVisible] = useState(false);
       const [start_date,setstart_date]=useState<string>();
    const[date_validate,setDate_validated]=useState<boolean>(false);
    const{setActiveNotificationCount}=useContext(NavContexts);

  useEffect(() => {
    generateMsaId();
  }, []);
  const generateMsaId = async () => {
    try {
      let uniqueIdGenerated = false;
      let generatedId = "";
      while (!uniqueIdGenerated) {
        generatedId = `MSA${Math.floor(Math.random() * 1000)}`;
        const exists = await getapi(generatedId);
        if (!exists) {
          uniqueIdGenerated = true;
        }
      }
      setMsaRefId(generatedId);
      setFormData({ ...formData, msa_ref_id: generatedId });
    } catch (error) {
      console.error("Error generating MSA ID:", error);
    }
  };

    const [formData, setFormData] = useState({
        msa_ref_id: '',
        client_name: '',
        region: '',
        start_date: '',
        end_date: '',
        comments: '',
        file:null as File | null
      });
      const beforeUpload = (file:RcFile) => {
        if (file.size > maxSize) {
          message.error('File must be smaller than 10MB!');
          return false; // Cancel upload
        }
        return true; // Continue with upload
      };
      const handleFileUpload = (info: any) => {
      try{
    
          console.log('File uploaded successfully:', info.file);
          setFormData({...formData,file:info.file})
          console.log(formData)
          setFileName(info.file.name)
      }
      catch(e){
        console.log("file upload error is", e)
      }
      };
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

      };
    
      const handleDateChange = (date: Moment | null, dateString: string | string[]) => {
       // console.log("datestring:" , dateString)
        if (typeof dateString === 'string') {
          setFormData({ ...formData, start_date: dateString });
          setstart_date(start_date);
        } 
        
      };
      
      const handleEndDateChange = (date: Moment | null, dateString: string | string[]) => {
        if (typeof dateString === 'string') {
          setFormData({ ...formData, end_date: dateString });
        }
      };
      const handleAddMsa = () => {
        const formstatus = isFormFilled();
          if (formstatus=="field") {
            window.alert(
              "Please fill all required fields before submitting the form."
            );
          } else if(formstatus=="date"){
            window.alert(
              "End Date must be greater than Start Date."
            );}else{
        setIsModalVisible(true);
          }
      };
      console.log(formData)
      const datevalidation=()=>{
       
      }
      const handleOk=async()=>{
        SubmitAddMsa();
      }
      const SubmitAddMsa=async()=>{
        try {

          console.log("after setting:", formData)
          setSpinning(true);

      //setFullPageSpinner(false);
      const formDatatoSend = new FormData();
      formDatatoSend.append("msa_ref_id", formData.msa_ref_id);
      formDatatoSend.append("client_name", formData.client_name);
      formDatatoSend.append("region", formData.region);

      // Format start_date and end_date
      formDatatoSend.append("start_date", formData.start_date);
      formDatatoSend.append("end_date", formData.end_date);

      formDatatoSend.append("comments", formData.comments);
      formDatatoSend.append("file", formData.file || "");

      await postapi(formDatatoSend, user_id);
      //console.log("Is this page posting after post")

          setMsaAdded(true);
          // setIsModalVisible(false);
            setIsModalVisible(false);
          form.resetFields();
          generateMsaId();
          navigate("/MSA Overview", { state: { added: true } });
          //}
        } catch (error) {
          console.error("Error submitting form data:", error);
        }
        //setSpinning(false);

      }

      const validateStartDate = async (value:any) => {
        if (value && formData.end_date && moment(value).isAfter(formData.end_date)) {
          throw new Error('End date must be after start date');
        }
      };
    
      

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  console.log("msa added value before add msa", msaAdded);
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
      return "field";
    } else if (formData.end_date <= formData.start_date) {
      if (formData.end_date <= formData.start_date) {
        //message.error("End Date must be greater than Start Date")
        setDate_validated(true);
      } else {
        setDate_validated(false);
      }
      return "date";
    } else {
      return false;
    }
  };
  return (
    <div>
        <AddMsa
          msaRefId={msaRefId}
          handleFileUpload={handleFileUpload}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}
          handleEndDateChange={handleEndDateChange}
          handleAddMsa={handleAddMsa}
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          fileName={fileName}
          msaAdded={msaAdded}
          validateStartDate={validateStartDate}
          handleOk={handleOk}
          start_date={start_date}
          date_validate={date_validate}
          spinning={spinning}
          beforeUpload={beforeUpload}
        />
    </div>
  );
};

export default AddMsaHandler;

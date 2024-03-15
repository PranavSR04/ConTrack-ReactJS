import React, { useEffect, useState } from 'react'
import AddMsa from './AddMsa'
import { Form, Spin, message } from 'antd';
import moment, { Moment } from 'moment';
import { getapi } from './api/getapi';
import axios from 'axios';
import { postapi } from './api/postapi';
import ListMsaHandler from '../ListMsa/ListMsaHandler';

const AddMsaHandler = () => {
  const user_id: number = parseInt(localStorage.getItem('user_id') || "0");
 //console.log(user_id)
    const [form] = Form.useForm();
    const[msaAdded,setMsaAdded]=useState<boolean>(false);
    const [msaRefId,setMsaRefId]=useState<string>();
    const [fileName,setFileName]=useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [redirectToListMsa, setRedirectToListMsa] = useState(false); // State variable for redirection
    const [showListMsa, setShowListMsa] = useState(false); // State variable for showing list MSA
    const [showSpinner, setShowSpinner] = useState(false); // State variable for showing spinner

    useEffect( ()=>{
        generateMsaId()
    },[]);
    const generateMsaId= async ()=>{
      try {
        let uniqueIdGenerated = false;
        let generatedId = "";
        while (!uniqueIdGenerated) {
          generatedId = `MSA${Math.floor(Math.random() * 1000)}`;
          const exists =  await getapi(generatedId);
                  if (!exists) {
                      uniqueIdGenerated = true;
                  }
        }
        setMsaRefId(generatedId ); 
        setFormData({ ...formData, msa_ref_id: generatedId });
      } catch (error) {
        console.error("Error generating MSA ID:", error);
      }
    }

    const [formData, setFormData] = useState({
        msa_ref_id: '',
        client_name: '',
        region: '',
        start_date: null as Moment | null,
        end_date: null as Moment | null,
        comments: '',
        file:null as File | null
      });

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
      const handleAddMsa = () => {
        setIsModalVisible(true);
      };
      console.log(formData)
      const SubmitAddMsa=async()=>{
        try {
          console.log("after setting:", formData)
          setIsLoading(true)
         // setIsModalVisible(false); // Close modal
          setShowSpinner(true);
          const formDatatoSend = new FormData();
          formDatatoSend.append('msa_ref_id', formData.msa_ref_id);
          formDatatoSend.append('client_name', formData.client_name);
          formDatatoSend.append('region', formData.region);
          
          // Format start_date and end_date
          formDatatoSend.append('start_date', moment(formData.start_date).format('YYYY-MM-DD'));
          formDatatoSend.append('end_date', moment(formData.end_date).format('YYYY-MM-DD'));
          
          formDatatoSend.append('comments', formData.comments);
          formDatatoSend.append('file', formData.file||'');
          await postapi(formDatatoSend,user_id);
          setMsaAdded(true);
          // setIsModalVisible(false);
            setIsModalVisible(false);
            setTimeout(() => {
              setIsLoading(false);
              setRedirectToListMsa(true);
              setShowListMsa(true)
            }, 3000);
          
          
          form.resetFields();
          generateMsaId();
        } catch (error) {
          console.error("Error submitting form data:", error);
        }
      }
      const validateStartDate = async (value:any) => {
        if (value && formData.end_date && moment(value).isAfter(formData.end_date)) {
          throw new Error('Start date cannot be after end date');
        }
      };
    
      

      const handleCancel = () => {
        setIsModalVisible(false);
      };
      
  return (
    <div>
      {/* <AddMsa
      msaRefId={msaRefId}
      handleFileUpload={handleFileUpload}
      handleInputChange={handleInputChange}
      handleDateChange={handleDateChange}
      handleEndDateChange={handleEndDateChange}
      SubmitAddMsa={SubmitAddMsa}
      handleAddMsa={handleAddMsa}
      isModalVisible={isModalVisible}
      handleCancel={handleCancel}
      isLoading={isLoading}
      fileName={fileName}
      msaAdded={msaAdded}
      /> */}
      {!showListMsa && (
        <AddMsa
          msaRefId={msaRefId}
          handleFileUpload={handleFileUpload}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}
          handleEndDateChange={handleEndDateChange}
          SubmitAddMsa={SubmitAddMsa}
          handleAddMsa={handleAddMsa}
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          isLoading={isLoading}
          fileName={fileName}
          msaAdded={msaAdded}
          validateStartDate={validateStartDate}

        />
      )}
      {showListMsa && <ListMsaHandler />}
    </div>
  )
}

export default AddMsaHandler

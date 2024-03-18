import React, { useEffect, useState } from 'react'
import AddMsa from './AddMsa'
import { Form, Modal, Spin, message } from 'antd';
import moment, { Moment } from 'moment';
import { getapi } from './api/getapi';
import axios from 'axios';
import { postapi } from './api/postapi';
import ListMsaHandler from '../ListMsa/ListMsaHandler';
import { useNavigate } from 'react-router';

const AddMsaHandler = () => {
  const user_id: number = parseInt(localStorage.getItem('user_id') || "0");
 //console.log(user_id)
    const [form] = Form.useForm();
    const navigate=useNavigate();
    const[msaAdded,setMsaAdded]=useState<boolean>(false);
    const [spinning, setSpinning] = React.useState<boolean>(false);

    const [msaRefId,setMsaRefId]=useState<string>();
    const [fileName,setFileName]=useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [redirectToListMsa, setRedirectToListMsa] = useState(false); // State variable for redirection
    const [showListMsa, setShowListMsa] = useState(false); // State variable for showing list MSA
    const [showSpinner, setShowSpinner] = useState(false); // State variable for showing spinner
    const[fullPageSpinner,setFullPageSpinner]=useState<boolean>(false);
    const [start_date,setstart_date]=useState<string>();
    const[date_validate,setDate_validated]=useState<boolean>(false);
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
        start_date: '',
        end_date: '',
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
        setFullPageSpinner(true)
        SubmitAddMsa();
      }
      const SubmitAddMsa=async()=>{
        try {

          console.log("after setting:", formData)
          setIsLoading(true)
          setShowSpinner(true);
          setSpinning(true);

          //setFullPageSpinner(false);
          const formDatatoSend = new FormData();
          formDatatoSend.append('msa_ref_id', formData.msa_ref_id);
          formDatatoSend.append('client_name', formData.client_name);
          formDatatoSend.append('region', formData.region);
        
          // Format start_date and end_date
          formDatatoSend.append('start_date', formData.start_date);
          formDatatoSend.append('end_date', formData.end_date);
          
          formDatatoSend.append('comments', formData.comments);
          formDatatoSend.append('file', formData.file||'');
          
          await postapi(formDatatoSend,user_id);
          //console.log("Is this page posting after post")

          setMsaAdded(true);
          // setIsModalVisible(false);
            setIsModalVisible(false);

              setIsLoading(false);
              setRedirectToListMsa(true);
              setShowListMsa(true)
          
          
          form.resetFields();
          generateMsaId();
          navigate("/MSA Overview", { state: { added: true } });
          //}
        } catch (error) {
          console.error("Error submitting form data:", error);
        }
        //setSpinning(false);

      }
      const stopSpinning = () => {
        setTimeout(() => {
          setSpinning(false);
        }, 2000); // 2000 milliseconds = 2 seconds
      };
      useEffect(() => {
        stopSpinning();
      }, []);
      const validateStartDate = async (value:any) => {
        if (value && formData.end_date && moment(value).isAfter(formData.end_date)) {
          throw new Error('End date must be after start date');
        }
      };
    
      

      const handleCancel = () => {
        setIsModalVisible(false);
      };
      console.log("msa added value before add msa",msaAdded)
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
        }else if(formData.end_date<=formData.start_date){
          if(formData.end_date<=formData.start_date){
            //message.error("End Date must be greater than Start Date")
            setDate_validated(true)
          }else{
            setDate_validated(false)
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
          SubmitAddMsa={SubmitAddMsa}
          handleAddMsa={handleAddMsa}
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          isLoading={isLoading}
          fileName={fileName}
          msaAdded={msaAdded}
          validateStartDate={validateStartDate}
          handleOk={handleOk}
          fullPageSpinner={fullPageSpinner}
          isFormFilled={isFormFilled}
          start_date={start_date}
          date_validate={date_validate}
          spinning={spinning}
        />
    </div>
  )
}

export default AddMsaHandler

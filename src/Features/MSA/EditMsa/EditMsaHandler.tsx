import React, { useEffect, useState } from "react";
import EditMsa from "./EditMsa";
import { useLocation, useNavigate, useParams } from "react-router";
import { LocationStateProps, MsaDataType } from "./types";
import axios from "axios";
import moment, { Moment } from "moment";
import { Form } from "antd";
import { postapi } from "./api/postapi";
import { getapi } from "./api/getapi";
import ListMsaHandler from "../ListMsa/ListMsaHandler";
import { RcFile } from "antd/es/upload";

const EditMsaHandler = () => {
  // const { msa_ref_id } = useParams<string >();
  const navigate=useNavigate();
  const location = useLocation();
  let { msa_ref_id } = location.state as LocationStateProps;
  const[showFile,setShowFile]=useState<boolean>(false);
  const [form] = Form.useForm();
  const user_id: number = parseInt(localStorage.getItem("user_id") || "0");
  const [msaEdited, setMsaEdited] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileName,setFileName]=useState<string>();
  const [filePdf, setFilePdf] = useState<RcFile | null>();
  const[fullPageSpinner,setFullPageSpinner]=useState<boolean>(false);
 
  const [redirectToListMsa, setRedirectToListMsa] = useState(false); // State variable for redirection
  const [showListMsa, setShowListMsa] = useState(false); // State variable for showing list MSA
  const [showSpinner, setShowSpinner] = useState(false); // State variable for showing spinner
  // const [confirmLoading, setConfirmLoading] = useState(false);
  const [fileUpload, setFileUpload] = useState<boolean>(false);
  //console.log(msa_ref_id);
  const [msaData, setMsaData] = useState({
    client_name: "",
    region: "",
    start_date: "",
    end_date: "",
    comments: "",
    msa_doclink: "",
  });

  const [formData, setFormData] = useState({
    client_name: "",
    region: "",
    start_date: "",
    end_date: "",
    comments: "",
    file: null as RcFile | null  
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
      setShowFile(true)
      //console.log("MSA from api::", msa_data);
      if (msa_data) {
        const { client_name, region, start_date, end_date, msa_doclink } =
          msa_data;
        const formattedStartDate = moment(msaData.start_date, "DD-MM-YYYY");
        const formattedEndDate = moment(msaData.end_date, "DD-MM-YYYY");
        // Log the extracted values for debugging
        console.log("Extracted values:", {
          client_name,
          region,
          start_date,
          end_date,
          msa_doclink,
        });

        // Updating state with the extracted values
        setMsaData((prevState) => ({
          ...prevState,
          client_name: client_name,
          region: region,
          start_date: start_date, // Keeping as string
          end_date: end_date,
          msa_doclink: msa_doclink, // Keeping as string
        }));
      }
    } catch (error) {
      console.error("Error generating MSA ID:", error);
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
  }, [msaData, filePdf]);
  const fileCancel = () => {
    setFileUpload(true);
    setShowFile(false)
  };
  //console.log("the boolean for file cancel:", fileUpload);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMsaData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleDateChange = (
    date: Moment | null,
    dateString: string | string[]
  ) => {
    console.log("datestring:", dateString);
    if (typeof dateString === "string") {
      setMsaData({ ...msaData, start_date: dateString });
    } 
  };
  const handleEndDateChange = (
    date: Moment | null,
    dateString: string | string[]
  ) => {
    console.log("check end date", date);
    if (typeof dateString === "string") {
      setMsaData({ ...msaData, end_date: dateString });
    } 
  };
  const handleFileUpload = (info: any) => {
    try{
  
        console.log('File uploaded successfully:', info.file);
        setFormData({...formData,file:info.file as RcFile})
        setFileName(info.file.name);
        console.log("file for editing" ,info.file)
        setFilePdf(info.file)
    }
    catch(e){
      console.log("file upload error is", e)
    }
    };
  //console.log("Msa data when edited", msaData);
  console.log("form data before setting", formData);





  const handleEditMsa = () => {
    const formstatus = isFormFilled();
      if (formstatus=="field") {
        console.log("Is all the field required")
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
const handleOk=async()=>{
  setFullPageSpinner(true)
  SubmitEditMsa();
}
const SubmitEditMsa = async () => {
  try {
    //const formstatus = isFormFilled();
    
    setIsLoading(true);
    // setIsModalVisible(false); // Close modal
    setShowSpinner(true);
    if(formData.end_date<=formData.start_date){
      window.alert("End date must be greater than Start Date")
    }else{
    const formDatatoSend = new FormData();

    formDatatoSend.append("client_name", formData.client_name);

    formDatatoSend.append("region", formData.region);

    formDatatoSend.append("start_date", formData.start_date);

    formDatatoSend.append("end_date", formData.end_date);

    formDatatoSend.append("comments", formData.comments);
    formDatatoSend.append("file", filePdf || "");
   console.log("Data to be send: ",formDatatoSend)
    await postapi(formDatatoSend, msa_ref_id, user_id);
    setMsaEdited(true);

    setIsModalVisible(false);
    
      setIsLoading(false);
      setRedirectToListMsa(true);
      setShowListMsa(true);
   
    form.resetFields();
    navigate('/MSA',{ state: { edited:true } })
    }
  } catch (error) {
    console.error("Error submitting form data:", error);
  }
};
const handleCancel = () => {
  setIsModalVisible(false);
};
  //console.log(msaData);
  //console.log("Edit MSA Ref", msa_ref_id);
  const isFormFilled = () => {
    console.log("test", fileName);
    console.log("test clent name", formData.client_name);
    if (
      formData.client_name == "" ||
      formData.region == "" ||
      formData.start_date == "" ||
      formData.end_date == ""
    ) {
      
      return "field";
    }else if(formData.end_date<=formData.start_date){
      
      return "date";
    } else {
      return false;
    }
  };
  return (
    <div>
      <EditMsa
        handleInputChange={handleInputChange}
        handleDateChange={handleDateChange}
        handleEndDateChange={handleEndDateChange}
        msa_ref_id={msa_ref_id || ""}
        msaData={msaData}
        SubmitEditMsa={SubmitEditMsa}
        handleEditMsa={handleEditMsa}
        // confirmLoading={confirmLoading}
        fileCancel={fileCancel}
        fileUpload={fileUpload}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        isLoading={isLoading}
        msaEdited={msaEdited}
        showFile={showFile}
        handleFileUpload={handleFileUpload}
        fileName={fileName}
        handleOk={handleOk}
        fullPageSpinner={fullPageSpinner}
          isFormFilled={isFormFilled}
      />
    </div>
  );
};

export default EditMsaHandler;

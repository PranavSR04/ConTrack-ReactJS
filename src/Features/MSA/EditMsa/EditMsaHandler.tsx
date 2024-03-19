import React, { useEffect, useState } from "react";
import EditMsa from "./EditMsa";
import { useLocation, useNavigate, useParams } from "react-router";
import { LocationStateProps } from "./types";
import moment, { Moment } from "moment";
import { Form, message } from "antd";
import { postapi } from "./api/postapi";
import { getapi } from "./api/getapi";
import { RcFile } from "antd/es/upload";

const EditMsaHandler = () => {
  const navigate=useNavigate();
  const location = useLocation();
  let { msa_ref_id } = location.state as LocationStateProps;
  const[showFile,setShowFile]=useState<boolean>(false);
  const [form] = Form.useForm();
  const user_id: number = parseInt(localStorage.getItem("user_id") || "0");
  const [msaEdited, setMsaEdited] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileName,setFileName]=useState<string>();
  const [filePdf, setFilePdf] = useState<RcFile | null>();
  const [spinning, setSpinning] = React.useState<boolean>(false);
  const maxSize = 10 * 1024 * 1024;
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
      if (msa_data) {
        const { client_name, region, start_date, end_date, msa_doclink } =
          msa_data;
        // Updating state with the extracted values
        setMsaData((prevState) => ({
          ...prevState,
          client_name: client_name,
          region: region,
          start_date: start_date,
          end_date: end_date,
          msa_doclink: msa_doclink, 
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
    }
  }, [msaData, filePdf]);
  const fileCancel = () => {
    setShowFile(false)
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMsaData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleDateChange = (
    date: Moment | null,
    dateString: string | string[]
  ) => {
    if (typeof dateString === "string") {
      setMsaData({ ...msaData, start_date: dateString });
      setFormData({...formData,start_date:dateString})
    } 
  };
  const handleEndDateChange = (
    date: Moment | null,
    dateString: string | string[]
  ) => {
    if (typeof dateString === "string") {
      setMsaData({ ...msaData, end_date: dateString });
      setFormData({...formData,start_date:dateString})
    } 
  };
  const beforeUpload = (file:RcFile) => {
    if (file.size > maxSize) {
      message.error('File must be smaller than 10MB!');
      return false; // Cancel upload
    }
    return true; // Continue with upload
  };
  const handleFileUpload = (info: any) => {
    try{
          setFormData({...formData,file:info.file as RcFile})
        setFileName(info.file.name);
        setFilePdf(info.file)
        
    }
    catch(e){
      console.log("file upload error is", e)
    }
    };
  const handleEditMsa = () => {
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

const SubmitEditMsa = async () => {
  try {
    
      setSpinning(true)
    const formDatatoSend = new FormData();
    
    formDatatoSend.append("client_name", formData.client_name);

    formDatatoSend.append("region", formData.region);

    formDatatoSend.append("start_date", formData.start_date);

    formDatatoSend.append("end_date", formData.end_date);

    formDatatoSend.append("comments", formData.comments);
    formDatatoSend.append("file", filePdf || "");
   console.log("Data to be send: ",formDatatoSend);
    await postapi(formDatatoSend, msa_ref_id, user_id);
    setMsaEdited(true);

    setIsModalVisible(false);
   
    form.resetFields();
    navigate("/MSA Overview", { state: { edited: true } });

  } catch (error) {
    console.error("Error submitting form data:", error);
  }
  setSpinning(false)
};

const handleCancel = () => {
  setIsModalVisible(false);
};
const validateStartDate = async (value:any) => {
  if (value && formData.end_date && moment(value).isAfter(formData.end_date)) {
    throw new Error('End date must be after start date');
  }
};
const validateClientName=async(value:any)=>{
  if(formData.client_name==null)
  {
    throw new Error("Client cannot be empty")
  }
}
const validateRegion=async(value:any)=>{
  if(formData.region==null)
  {
    throw new Error("Region cannot be empty")
  }
}

  const isFormFilled = () => {
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
        fileCancel={fileCancel}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        msaEdited={msaEdited}
        showFile={showFile}
        handleFileUpload={handleFileUpload}
        fileName={fileName}
          isFormFilled={isFormFilled}
          validateStartDate={validateStartDate}
          validateClientName={validateClientName}
          validateRegion={validateRegion}
          spinning={spinning}
          beforeUpload={beforeUpload}
      />
    </div>
  );
};

export default EditMsaHandler;

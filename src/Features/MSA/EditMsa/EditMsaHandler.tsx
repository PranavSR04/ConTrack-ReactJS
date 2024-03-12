import React, { useEffect, useState } from 'react'
import EditMsa from './EditMsa'
import { useParams } from 'react-router';
import { MsaDataType } from './types';
import axios from 'axios';
import { Moment } from 'moment';

const EditMsaHandler = () => {
  const { msa_ref_id } = useParams<{ msa_ref_id: string }>();
  const [msaData, setMsaData] = useState({
    msa_ref_id: '',
    client_name: '',
    region: '',
    start_date: null as Moment | null,
    end_date: null as Moment | null,
    comments: '',
    file:null as File | null
  });
useEffect(() => {

  if (msa_ref_id) { // Type guard to ensure msa_ref_id is not undefined
    autoFillMsa(msa_ref_id);
  }}, []);
const getapi = async (msa_ref_id: string): Promise<boolean> => {
  try {
      const response = await axios.get(
          `http://127.0.0.1:8000/api/msa/list?msa_ref_id=${msa_ref_id}`
      );
      return response.data.exists;
  } catch (error) {
      console.error("Error checking MSA ID existence:", error);
      throw error;
  }

};
const getMsaData = async (msa_ref_id: string) => {
  try {
    // Make your API call here to get data for the specified msa_ref_id
    const response = await fetch(`http://127.0.0.1:8000/api/msa/list?msa_ref_id=${msa_ref_id}`);
    const data = await response.json();
    // console.log(data.data)
    return data;
  } catch (error) {
    console.error('Error fetching MSA data:', error);
    return null;
  }
};
const autoFillMsa = async (msa_ref_id:string) => {
  try {
       
      const exists = await getapi(msa_ref_id);
      if (!exists) {
        const data = await getMsaData(msa_ref_id);
        //console.log(data)
        if (data) {
          setMsaData(prevMsaData => ({
            ...prevMsaData,
            ...data // Assuming data is an object containing key-value pairs
          }));
          
        }
     }

  } catch (error) {
    console.error("Error generating MSA ID:", error);
  }

};
  return (
    <></>
    // <div>
    // <EditMsa 
    // // msaData={msaData}/>
      
    // </div>
  )
}

export default EditMsaHandler

import axios from 'axios';
import axiosInstance from '../../../../Config/AxiosConfig';


export const getapi = async (generatedId: string): Promise<boolean> => {
    try {
        const response = await axios.get(
            `http://127.0.0.1:8000/api/msa/list?msa_ref_id=${generatedId}`
        );
        return response.data.exists;
    } catch (error) {
        console.error("Error checking MSA ID existence:", error);
        throw error;
    }
    // if(await axiosInstance.get('api/msa/list?msa_ref_id=${generatedId}')){
    //     return false;
    // }
    // else
    // return true;
};
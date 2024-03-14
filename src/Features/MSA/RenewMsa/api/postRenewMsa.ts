import axios from 'axios';
import axiosInstance from '../../../../Config/AxiosConfig';

export const postRenewMsa = async (msa_ref_id: string|undefined, user_id:number, formDatatoSend:FormData) => {
    try {
        const data = await axiosInstance.post(
            `api/msa/renew/${user_id}?msa_ref_id=${msa_ref_id}`,
            formDatatoSend,
        );
        return data;
    } catch (error) {
        console.error("Error checking MSA ID existence:", error);
        throw error;
    }
};
import axiosInstance from '../../../../Config/AxiosConfig';


export const getapi = async () => {
    try {
        const response = await axiosInstance.get(
            `api/msa/list`
        );
        return response;
    } catch (error) {
        console.error("Error checking MSA ID existence:", error);
        throw error;
    }

};

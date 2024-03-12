import axiosInstance from "../../../Config/AxiosConfig";

export const getUser = async () => {
  return await axiosInstance
    .get("/api/users/getusers")
    .then((res) => res.data)
    .catch((err) => err);
};

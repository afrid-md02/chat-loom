import { useCallback } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";

export default function useUpdateProfile(baseURL) {
  const token = useSelector((state) => state.auth.token);

  //mutate update profile
  const mutateUpdateProfile = useCallback(
    async (userData) => {
      if (userData.userName.trim().length < 4) {
        throw new Error("Username must be min:4 characters in length");
      }
      if (
        userData.gender === undefined ||
        userData.gender === null ||
        userData.gender === ""
      ) {
        throw new Error("Please select gender");
      }
      if (userData.bio.trim().length > 150) {
        throw new Error("Bio should not exceed 150 characters");
      }

      return await axios.put(baseURL, userData, {
        headers: {
          Authorization: token,
        },
      });
    },
    [baseURL, token],
  );

  //handle success
  const onSuccessUpdateProfile = useCallback(async (response) => {
    if (response.status === 201) {
      const data = await response.data;
      toast.success(data.message, {
        position: "top-center",
      });
    }
  }, []);

  //handle error
  const onErrorUpdateProfile = useCallback(async (error) => {
    let message = error?.response?.data?.error;
    if (!message) {
      message = error.message;
    }
    toast.error(message, {
      position: "top-right",
    });
  }, []);

  return { mutateUpdateProfile, onSuccessUpdateProfile, onErrorUpdateProfile };
}

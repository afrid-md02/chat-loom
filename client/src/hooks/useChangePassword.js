import { useCallback } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import axios from "axios";

export default function useChangePassword(baseURL) {
  const token = useSelector((state) => state.auth.token);

  //mutate change password
  const mutateChangePassword = useCallback(
    async (userData) => {
      if (userData.oldPassword.trim().length < 6) {
        throw new Error("Old password must be min:6 characters in length");
      }
      if (userData.newPassword.trim().length < 6) {
        throw new Error("New password must be min:6 characters in length");
      }
      if (userData.newPassword.trim() !== userData.confirmNewPassword.trim()) {
        throw new Error("New passwords must match");
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
  const onSuccessChangePassword = useCallback(async (response) => {
    if (response.status === 201) {
      const data = await response.data;
      toast.success(data.message, {
        position: "top-center",
      });
    }
  }, []);

  //handle error
  const onErrorChangePassword = useCallback(async (error) => {
    console.error(error);
    let message = error?.response?.data?.error;
    if (!message) {
      message = error.message;
    }
    toast.error(message, {
      position: "top-right",
    });
  }, []);

  return {
    mutateChangePassword,
    onSuccessChangePassword,
    onErrorChangePassword,
  };
}

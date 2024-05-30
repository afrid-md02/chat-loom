import { useCallback } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function useResetPassword(baseURL) {
  const navigate = useNavigate();

  //mutate reset password
  const mutateResetPassword = useCallback(
    async ({ userData, resetToken }) => {
      if (userData.newPassword.trim().length < 6) {
        throw new Error("New password must be min:6 characters in length");
      }
      if (userData.newPassword.trim() !== userData.confirmNewPassword.trim()) {
        throw new Error("New password must match");
      }
      return await axios.post(baseURL, userData, {
        headers: {
          Authorization: resetToken,
        },
      });
    },
    [baseURL],
  );

  //handle success
  const onSuccessResetPassword = useCallback(
    async (response) => {
      if (response.status === 201) {
        const data = await response.data;
        toast.success(data.message, {
          position: "top-center",
        });
        return navigate("/");
      }
    },
    [navigate],
  );

  //handle error
  const onErrorResetPassword = useCallback(async (error) => {
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
    mutateResetPassword,
    onSuccessResetPassword,
    onErrorResetPassword,
  };
}

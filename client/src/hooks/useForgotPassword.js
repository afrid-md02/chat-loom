import { useCallback } from "react";
import { toast } from "sonner";
import axios from "axios";

export default function useForgotPassword(baseURL) {
  //mutate forgot password
  const mutateForgotPassword = useCallback(
    async (userData) => {
      if (!userData.email.includes("@") || !userData.email.includes(".com")) {
        throw new Error("Please enter a valid email");
      }
      return await axios.post(baseURL, userData);
    },
    [baseURL],
  );

  //handle success
  const onSuccessForgotPassword = useCallback(async (response) => {
    if (response.status === 200) {
      const data = await response.data;
      toast.success(data.message, {
        position: "top-center",
      });
    }
  }, []);

  //handle error
  const onErrorForgotPassword = useCallback(async (error) => {
    let message = error?.response?.data?.error;
    if (!message) {
      message = error.message;
    }
    toast.error(message, {
      position: "top-right",
    });
  }, []);

  return {
    mutateForgotPassword,
    onSuccessForgotPassword,
    onErrorForgotPassword,
  };
}

import { useCallback } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import axios from "axios";

export default function useUnBlockUser(baseURL) {
  const token = useSelector((state) => state.auth.token);

  //mutate unblock user
  const mutateUnBlockUser = useCallback(
    async (friendId) => {
      return await axios.put(
        baseURL,
        { friendId },
        {
          headers: {
            Authorization: token,
          },
        },
      );
    },
    [baseURL, token],
  );

  //handle success
  const onSuccessUnBlockUser = useCallback(async (response) => {
    if (response.status === 201) {
      const data = await response.data;
      toast.success(data.message, {
        position: "top-center",
      });
    }
  }, []);

  //handle error
  const onErrorUnBlockUser = useCallback(async (error) => {
    let message = error?.response?.data?.error;
    if (!message) {
      message = error.message;
    }
    toast.error(message, {
      position: "top-right",
    });
  }, []);

  return {
    mutateUnBlockUser,
    onSuccessUnBlockUser,
    onErrorUnBlockUser,
  };
}

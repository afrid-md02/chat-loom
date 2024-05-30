import { useCallback } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import axios from "axios";

export default function useSendFriendRequest(baseURL) {
  const token = useSelector((state) => state.auth.token);

  //mutate send friend request
  const mutateSendFriendRequest = useCallback(
    async (notification) => {
      return await axios.post(baseURL, notification, {
        headers: {
          Authorization: token,
        },
      });
    },
    [baseURL, token],
  );

  //handle success
  const onSuccessSendFriendRequest = useCallback(async (response) => {
    if (response.status === 201) {
      const data = await response.data;
      toast.success(data.message, {
        position: "top-center",
      });
    }
  }, []);

  //handle error
  const onErrorSendFriendRequest = useCallback(async (error) => {
    let message = error?.response?.data?.error;
    if (!message) {
      message = error.message;
    }
    toast.error(message, {
      position: "top-right",
    });
  }, []);

  return {
    mutateSendFriendRequest,
    onSuccessSendFriendRequest,
    onErrorSendFriendRequest,
  };
}

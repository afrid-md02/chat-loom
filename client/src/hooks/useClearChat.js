import { useCallback } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessages } from "../redux/chatLoomStore";

export default function useClearChat(baseURL) {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  //mutate clear chat
  const mutateClearChat = useCallback(async () => {
    return await axios.delete(baseURL, {
      headers: {
        Authorization: token,
      },
    });
  }, [baseURL, token]);

  //handle success
  const onSuccessClearChat = useCallback(
    async (response) => {
      if (response.status === 200) {
        const data = await response.data;
        dispatch(setMessages({ messages: [] }));
        toast.success(data.message, {
          position: "top-center",
        });
      }
    },
    [dispatch],
  );

  //handle error
  const onErrorClearChat = useCallback(async (error) => {
    let message = error?.response?.data?.error;
    if (!message) {
      message = error.message;
    }
    toast.error(message, {
      position: "top-right",
    });
  }, []);

  return {
    mutateClearChat,
    onSuccessClearChat,
    onErrorClearChat,
  };
}

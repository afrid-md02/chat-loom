import { useCallback } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setGeneralRoomAddOneMessage } from "../redux/chatLoomStore";
import { calculateDateForId } from "../utilities/calculator";

export default function useGeneralRoomSendMessage(baseURL) {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  //mutate send message
  const mutateGeneralRoomSendMessage = useCallback(
    async (message) => {
      if (
        (!message.text ?? message.text.trim() === "") &&
        (!message.selectedFile.name ?? message.selectedFile.name.trim() === "")
      ) {
        throw new Error("Please enter some message");
      }

      if (
        !message.selectedFile.name ??
        message.selectedFile.name.trim() === ""
      ) {
        const messageWithText = { text: message.text };
        return await axios.post(baseURL, messageWithText, {
          headers: {
            Authorization: token,
          },
        });
      }

      let messageWithFile;
      if (message.selectedFile.type.includes("image/")) {
        messageWithFile = {
          text: message.text,
          mediaType: "image",
          media: message.selectedFile,
        };
      } else {
        messageWithFile = {
          text: message.text,
          mediaType: "video",
          media: message.selectedFile,
        };
      }

      return await axios.post(baseURL, messageWithFile, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
    },
    [baseURL, token],
  );

  const onSuccessGeneralRoomSendMessage = useCallback(
    async (response) => {
      if (response.status === 201) {
        const data = await response.data;

        const inputDate = calculateDateForId(data.finalMessage.createdAt);

        dispatch(
          setGeneralRoomAddOneMessage({
            date: inputDate,
            newMessage: data.finalMessage,
          }),
        );
        window.scrollTo(0, document.body.scrollHeight);
        toast.success(data.message, {
          position: "top-center",
        });
      }
    },
    [dispatch],
  );

  const onErrorGeneralRoomSendMessage = useCallback(async (error) => {
    let message = error?.response?.data?.error;
    if (!message) {
      message = error.message;
    }
    toast.error(message, {
      position: "top-right",
    });
  }, []);

  return {
    mutateGeneralRoomSendMessage,
    onSuccessGeneralRoomSendMessage,
    onErrorGeneralRoomSendMessage,
  };
}

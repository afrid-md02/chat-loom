import { useRef } from "react";
import { AttachFile, Send, RotateRight } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import useSendMessage from "../../hooks/useSendMessage";
import serverURL from "../../utilities/server_url";

const SendMessageForm = ({ setFilePreview, fileInputRef }) => {
  const messageInputRef = useRef(null);
  const { friendId: receiverId } = useParams();

  const { mutateSendMessage, onSuccessSendMessage, onErrorSendMessage } =
    useSendMessage(`${serverURL}/chat/send/${receiverId}`);
  const { mutate, isPending } = useMutation({
    mutationFn: mutateSendMessage,
    onSuccess: onSuccessSendMessage,
    onError: onErrorSendMessage,
  });

  async function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  async function handleMessage(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const userData = Object.fromEntries(fd.entries());
    mutate(userData);
    messageInputRef.current.value = null;
    fileInputRef.current.value = null;
    setFilePreview("");
  }

  return (
    <form className="messageForm" onSubmit={handleMessage}>
      <textarea
        ref={messageInputRef}
        name="text"
        type="text"
        placeholder="Type a message..."
        className="max-h-10 w-full resize-none rounded-md bg-inherit px-1.5 py-1 text-xs tracking-wider text-copy outline-none placeholder:font-medium placeholder:tracking-wide md:text-sm"
      />
      <input
        ref={fileInputRef}
        type="file"
        id="file-upload-input"
        className="hidden"
        name="selectedFile"
        accept="image/*, video/*"
        onChange={handleFileChange}
      />
      <label
        htmlFor="file-upload-input"
        className="flex items-center px-1 cursor-pointer"
      >
        <AttachFile className="text-copy" fontSize="medium" />
      </label>
      <button
        disabled={isPending ? true : false}
        type="submit"
        className="flex items-center rounded bg-primary p-1 sm:space-x-2.5 sm:px-3 sm:py-1.5"
      >
        {isPending ? (
          <RotateRight
            fontSize="small"
            className="animate-spin text-primarycontent"
          />
        ) : (
          <>
            <span className="hidden text-sm font-medium tracking-wider text-primarycontent sm:inline-block">
              Send
            </span>
            <Send fontSize="small" className="text-primarycontent" />
          </>
        )}
      </button>
    </form>
  );
};

export default SendMessageForm;

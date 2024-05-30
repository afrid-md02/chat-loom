import { useMutation } from "@tanstack/react-query";
import { RotateRight } from "@mui/icons-material";
import { toast } from "sonner";

import useClearChat from "../../hooks/useClearChat";
import serverURL from "../../utilities/server_url";

const DeleteConversationButton = ({ friendId }) => {
  const { mutateClearChat, onSuccessClearChat, onErrorClearChat } =
    useClearChat(`${serverURL}/chat/conversation-btw-users/${friendId}`);
  const { mutate, isPending } = useMutation({
    mutationFn: mutateClearChat,
    onSuccess: onSuccessClearChat,
    onError: onErrorClearChat,
  });

  async function clearChat() {
    toast.warning(
      "Are you sure you want to clear chat? your all messages, images, videos will be deleted for both users.",
      {
        important: true,
        duration: 10000,
        closeButton: false,
        position: "top-center",
        cancel: {
          label: "Cancel",
          onClick: () => console.log("clear chat cancelled"),
        },
        action: {
          label: "Yes",
          onClick: async () => {
            mutate();
          },
        },
      },
    );
  }

  return (
    <button
      onClick={clearChat}
      type="button"
      disabled={isPending}
      className="background_animations flex w-full items-center justify-center space-x-0.5 px-1 py-1.5 hover:bg-indigo-800"
    >
      {isPending ? (
        <>
          <RotateRight className="animate-spin" fontSize="small" />
          <span>Clearing your chat...</span>
        </>
      ) : (
        <span>Clear chat</span>
      )}
    </button>
  );
};
export default DeleteConversationButton;

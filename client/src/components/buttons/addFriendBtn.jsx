import { useMutation } from "@tanstack/react-query";
import { PersonAddAlt1, RotateRight } from "@mui/icons-material";

import serverURL from "../../utilities/server_url";

import useSendFriendRequest from "../../hooks/useSendFriendRequest";

const AddFriendButton = ({ receiverId }) => {
  const {
    mutateSendFriendRequest,
    onSuccessSendFriendRequest,
    onErrorSendFriendRequest,
  } = useSendFriendRequest(
    `${serverURL}/user/send-friendrequest/${receiverId}`,
  );
  const { mutate, isPending } = useMutation({
    mutationFn: mutateSendFriendRequest,
    onSuccess: onSuccessSendFriendRequest,
    onError: onErrorSendFriendRequest,
  });

  async function sendFriendRequest() {
    const notification = { notificationType: "friendRequest" };
    mutate(notification);
  }

  return (
    <button
      onClick={sendFriendRequest}
      type="button"
      disabled={isPending}
      className="background_animations flex w-full max-w-xs items-center justify-center space-x-3 rounded bg-green-600 px-4 py-1.5 text-xs tracking-wide text-primarycontent hover:scale-105 hover:bg-green-700 sm:text-sm"
    >
      {isPending ? (
        <>
          <RotateRight fontSize="medium" className="animate-spin" />
          <p className="font-medium">Sending friend request...</p>
        </>
      ) : (
        <>
          <PersonAddAlt1 fontSize="medium" />
          <p className="font-medium">Add friend</p>
        </>
      )}
    </button>
  );
};

export default AddFriendButton;

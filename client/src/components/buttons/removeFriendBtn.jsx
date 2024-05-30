import { useMutation } from "@tanstack/react-query";
import { PersonRemove, RotateRight } from "@mui/icons-material";

import useRemoveFriend from "../../hooks/useRemoveFriend";
import serverURL from "../../utilities/server_url";

const RemoveFriendButton = ({ friendId }) => {
  const { mutateRemoveFriend, onSuccessRemoveFriend, onErrorRemoveFriend } =
    useRemoveFriend(`${serverURL}/user/remove-friend/${friendId}`);
  const { mutate, isPending } = useMutation({
    mutationFn: mutateRemoveFriend,
    onSuccess: onSuccessRemoveFriend,
    onError: onErrorRemoveFriend,
  });

  async function removeFriend() {
    mutate();
  }
  return (
    <button
      onClick={removeFriend}
      type="button"
      disabled={isPending}
      className="background_animations flex w-full max-w-xs items-center justify-center space-x-3 rounded bg-custompink px-4 py-1.5 text-xs tracking-wide text-primarycontent hover:scale-105 hover:bg-pink-800 sm:text-sm"
    >
      {isPending ? (
        <>
          <RotateRight fontSize="medium" className="animate-spin" />
          <p className="font-medium">Removing friend...</p>
        </>
      ) : (
        <>
          <PersonRemove fontSize="medium" />
          <p className="font-medium">Remove friend</p>
        </>
      )}
    </button>
  );
};

export default RemoveFriendButton;

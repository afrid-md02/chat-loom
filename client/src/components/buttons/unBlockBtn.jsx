import { useMutation } from "@tanstack/react-query";
import { Favorite, RotateRight } from "@mui/icons-material";

import useUnBlockUser from "../../hooks/useUnBlockUser";
import serverURL from "../../utilities/server_url";

const UnBlockButton = ({ friendId }) => {
  const { mutateUnBlockUser, onSuccessUnBlockUser, onErrorUnBlockUser } =
    useUnBlockUser(`${serverURL}/user/unblock-user/${friendId}`);
  const { mutate, isPending } = useMutation({
    mutationFn: mutateUnBlockUser,
    onSuccess: onSuccessUnBlockUser,
    onError: onErrorUnBlockUser,
  });

  async function blockUser() {
    mutate(friendId);
  }
  return (
    <button
      onClick={blockUser}
      type="button"
      disabled={isPending}
      className="background_animations flex w-full max-w-xs items-center justify-center space-x-3 rounded bg-green-600 px-4 py-1.5 text-xs tracking-wide text-primarycontent hover:scale-105 hover:bg-green-700 sm:text-sm"
    >
      {isPending ? (
        <>
          <RotateRight fontSize="medium" className="animate-spin" />
          <p className="font-medium">Unblocking...</p>
        </>
      ) : (
        <>
          <Favorite fontSize="medium" />
          <p className="font-medium">Unblock</p>
        </>
      )}
    </button>
  );
};

export default UnBlockButton;

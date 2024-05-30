import { useMutation } from "@tanstack/react-query";
import { RotateRight } from "@mui/icons-material";

import useBlockUser from "../../hooks/useBlockUser";
import serverURL from "../../utilities/server_url";

const BlockUserButton = ({ friendId }) => {
  const { mutateBlockUser, onSuccessBlockUser, onErrorBlockUser } =
    useBlockUser(`${serverURL}/user/block-user/${friendId}`);
  const { mutate, isPending } = useMutation({
    mutationFn: mutateBlockUser,
    onSuccess: onSuccessBlockUser,
    onError: onErrorBlockUser,
  });

  async function blockUser() {
    mutate(friendId);
  }

  return (
    <button
      onClick={blockUser}
      type="button"
      disabled={isPending}
      className="background_animations flex w-full items-center justify-center space-x-0.5 px-1 py-1.5 hover:bg-indigo-800"
    >
      {isPending ? (
        <>
          <RotateRight className="animate-spin" fontSize="small" />
          <span>Blocking the user...</span>
        </>
      ) : (
        <span>Block</span>
      )}
    </button>
  );
};

export default BlockUserButton;

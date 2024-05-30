import { useMutation } from "@tanstack/react-query";
import { Block, RotateRight } from "@mui/icons-material";

import useBlockUser from "../../hooks/useBlockUser";
import serverURL from "../../utilities/server_url";

const BlockButton = ({ friendId }) => {
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
      className="background_animations flex w-full max-w-xs items-center justify-center space-x-3 rounded bg-orange-600 px-4 py-1.5 text-xs sm:text-sm tracking-wide text-primarycontent hover:scale-105 hover:bg-orange-700"
    >
      {isPending ? (
        <>
          <RotateRight fontSize="medium" className="animate-spin" />
          <p className="font-medium">Blocking...</p>
        </>
      ) : (
        <>
          <Block fontSize="medium" />
          <p className="font-medium">Block</p>
        </>
      )}
    </button>
  );
};

export default BlockButton;

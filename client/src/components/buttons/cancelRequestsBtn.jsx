import { useSelector } from "react-redux";
import { Cancel } from "@mui/icons-material";
import { toast } from "sonner";
import axios from "axios";

import serverURL from "../../utilities/server_url";

const CancelRequestsButton = ({ userId }) => {
  const token = useSelector((state) => state.auth.token);

  function cancelFriendRequest(receiverId) {
    toast.warning("Are you sure you want to cancel request?", {
      important: true,
      duration: 10000,
      closeButton: false,
      position: "top-center",
      cancel: {
        label: "Cancel",
        onClick: () => console.log("Cancel request cancelled"),
      },
      action: {
        label: "Yes",
        onClick: async () => {
          try {
            const response = await axios.delete(
              `${serverURL}/user/cancel-friendrequest/${receiverId}`,
              {
                headers: {
                  Authorization: token,
                },
              },
            );
            if (response.status === 202) {
              const data = await response.data;
              toast.success(data.message, {
                position: "top-center",
              });
            }
          } catch (error) {
            let message = error?.response?.data?.error;
            if (!message) {
              message = error.message;
            }
            toast.error(message, {
              position: "top-right",
            });
          }
        },
      },
    });
  }

  return (
    <button
      onClick={() => cancelFriendRequest(userId)}
      type="button"
      className="flex items-center justify-normal space-x-0.5 rounded bg-orange-600 px-2 py-1 sm:space-x-1"
    >
      <Cancel fontSize="small" />
      <p className="text-xs font-medium tracking-wide sm:text-sm">Cancel</p>
    </button>
  );
};

export default CancelRequestsButton;

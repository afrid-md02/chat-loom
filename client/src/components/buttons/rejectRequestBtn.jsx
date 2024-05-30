import { useSelector } from "react-redux";
import { Cancel } from "@mui/icons-material";
import { toast } from "sonner";
import axios from "axios";

import serverURL from "../../utilities/server_url";

const RejectRequestButton = ({ userId }) => {
  const token = useSelector((state) => state.auth.token);

  async function rejectFriendRequest(receiverId) {
    toast.warning("Are you sure you want to reject?", {
      important: true,
      duration: 10000,
      closeButton: false,
      position: "top-center",
      cancel: {
        label: "Cancel",
        onClick: () => console.log("Reject cancelled"),
      },
      action: {
        label: "Yes",
        onClick: async () => {
          try {
            const response = await axios.delete(
              `${serverURL}/user/reject-friendrequest/${receiverId}`,
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
      onClick={() => rejectFriendRequest(userId)}
      type="button"
      className="flex items-center px-2 py-1 bg-orange-600 rounded justify-normal sm:space-x-1"
    >
      <Cancel fontSize="small" />
      <p className="hidden text-xs font-medium tracking-wide sm:block sm:text-sm">
        Reject
      </p>
    </button>
  );
};

export default RejectRequestButton;

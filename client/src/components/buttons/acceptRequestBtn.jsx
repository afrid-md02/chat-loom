import { CheckCircle } from "@mui/icons-material";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import axios from "axios";

import serverURL from "../../utilities/server_url";

const AcceptRequestButton = ({ userId }) => {
  const token = useSelector((state) => state.auth.token);

  async function acceptFriendRequest(receiverId) {
    try {
      const response = await axios.post(
        `${serverURL}/user/accept-friendrequest/${receiverId}`,
        { notificationType: "friendRequestAccepted" },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (response.status === 201) {
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
  }

  return (
    <button
      onClick={() => acceptFriendRequest(userId)}
      type="button"
      className="flex items-center px-2 py-1 bg-green-600 rounded justify-normal sm:space-x-1"
    >
      <CheckCircle fontSize="small" />
      <p className="hidden text-xs font-medium tracking-wide sm:block sm:text-sm">
        Accept
      </p>
    </button>
  );
};

export default AcceptRequestButton;

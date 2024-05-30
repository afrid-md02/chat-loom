import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";

import serverURL from "../../utilities/server_url";

const MarkAsReadButton = ({ notificationId }) => {
  const token = useSelector((state) => state.auth.token);

  async function markAsRead(id) {
    try {
      const response = await axios.put(
        `${serverURL}/notification/mark-asread`,
        { notificationId: id },
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
      onClick={() => markAsRead(notificationId)}
      type="button"
      className="background_animations w-full px-1 py-1.5 hover:hover:bg-indigo-800"
    >
      mark as read
    </button>
  );
};

export default MarkAsReadButton;

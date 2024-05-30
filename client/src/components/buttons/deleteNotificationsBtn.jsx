import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";

import serverURL from "../../utilities/server_url";

const DeleteNotificationsBtn = ({ notificationId }) => {
  const token = useSelector((state) => state.auth.token);

  async function deleteNotification(id) {
    try {
      const response = await axios.delete(
        `${serverURL}/notification/delete/${id}`,
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
      onClick={() => deleteNotification(notificationId)}
      type="button"
      className="background_animations w-full px-1 py-1.5 hover:bg-indigo-800"
    >
      delete
    </button>
  );
};

export default DeleteNotificationsBtn;

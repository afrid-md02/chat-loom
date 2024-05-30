import { useState } from "react";
import { Link } from "react-router-dom";
import { MoreVert } from "@mui/icons-material";

import MarkAsReadButton from "../../buttons/markAsReadBtn";
import DeleteNotificationsBtn from "../../buttons/deleteNotificationsBtn";

const ListItem = ({ notification }) => {
  const [options, setOptions] = useState(false);

  let path;
  if (notification.type === "friendRequest") path = "/admin/pending-requests";
  else if (notification.type === "friendRequestAccepted")
    path = `/friend-chat/${notification.from}`;

  const openOptions = () => {
    setOptions((prev) => !prev);
  };

  return (
    <li
      className={`background_animations px-1.5 py-3 font-Raleway hover:bg-foreground sm:px-2 sm:py-4 ${notification.isRead ? "hover:bg-foreground" : "bg-foreground hover:bg-background"}`}
    >
      <div className="flex items-center space-x-4 sm:space-x-8 md:space-x-16">
        <Link to={path} className="flex-1 min-w-0">
          <p className="text-sm font-medium tracking-wide truncate text-copy">
            {notification.content}
          </p>
        </Link>
        <div className="relative inline-flex items-center p-1 rounded-md text-copylight">
          <button type="button" onClick={openOptions} className="">
            <MoreVert fontSize="small" />
          </button>
          {options && (
            <div className="absolute right-0 z-30 px-1 py-1 text-xs font-medium tracking-wider bg-indigo-600 divide-y-2 rounded top-8 w-28 divide-copylighter text-primarycontent">
              {!notification.isRead && (
                <MarkAsReadButton notificationId={notification._id} />
              )}
              <DeleteNotificationsBtn notificationId={notification._id} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default ListItem;

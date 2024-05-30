import { Link } from "react-router-dom";
import { ChevronRight } from "@mui/icons-material";
import { useContext } from "react";
import SocketContext from "../../../contextApi/socketContext";

const ListItem = ({ friend }) => {
  const { onlineUsers } = useContext(SocketContext);
  const isOnline = onlineUsers.includes(friend._id);

  return (
    <li className="px-1 py-3 background_animations font-Raleway hover:bg-foreground sm:py-4">
      <Link to={`/friend-chat/${friend._id}`}>
        <div className="flex items-center space-x-4">
          <div className="relative flex-shrink-0">
            <img
              className="object-contain w-10 h-10 border-2 border-blue-600 rounded-full"
              src={friend.profilePicture}
              alt={friend.userName}
            />
            <div
              className={`absolute right-0 top-0 h-3 w-3 rounded-full border border-blue-600 ${isOnline ? "bg-green-600" : "bg-gray-600"}`}
            ></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium tracking-wide truncate text-copy">
              {friend.userName}
            </p>
            <p className="text-xs font-medium tracking-wide truncate text-copylighter">
              {isOnline ? "online" : "offline"}
            </p>
          </div>
          <div className="inline-flex items-center p-1 rounded-md text-copylight">
            <ChevronRight fontSize="small" />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ListItem;

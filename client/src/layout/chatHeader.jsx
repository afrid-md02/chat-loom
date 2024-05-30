import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, MoreVert } from "@mui/icons-material";
import axios from "axios";

import serverURL from "../utilities/server_url";
import DeleteConversationButton from "../components/buttons/deleteConversationBtn";
import BlockUserButton from "../components/buttons/blockUserBtn";
import SocketContext from "../contextApi/socketContext";

const ChatHeader = () => {
  const [options, setOptions] = useState(false);
  const { onlineUsers } = useContext(SocketContext);
  const { friendId } = useParams();
  const token = useSelector((state) => state.auth.token);

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["friend"],
    queryFn: () => {
      return axios.get(`${serverURL}/user/friend-profile/${friendId}`, {
        headers: {
          Authorization: token,
        },
      });
    },
  });

  if (isLoading) {
    return (
      <p className="px-2 py-5 text-xs font-medium tracking-wide text-center border-b-2 animate-pulse border-border font-Raleway text-copy sm:text-sm">
        Loading your friend info.....
      </p>
    );
  }

  if (isError) {
    return (
      <p className="px-2 py-5 text-xs font-medium tracking-wide text-center text-red-600 border-b-2 animate-pulse border-border font-Raleway sm:text-sm">
        Some error occured, while fetching your friend info
      </p>
    );
  }

  function showOptions() {
    setOptions((prev) => !prev);
  }

  const isOnline = onlineUsers.includes(response.data.friendProfile._id);

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between max-w-5xl mx-auto border-b-2 border-border backdrop-blur-md">
      <div className="flex items-center space-x-1.5 py-4">
        <Link to="/admin">
          <ChevronLeft fontSize="medium" className="text-primarylight" />
        </Link>
        <div className="relative flex items-center space-x-2">
          <div className="relative flex-shrink-0">
            <img
              className="object-contain w-10 h-10 border-2 border-blue-600 rounded-full"
              src={response.data.friendProfile.profilePicture}
              alt={response.data.friendProfile.userName}
            />
            <div
              className={`absolute right-0 top-0 h-3 w-3 rounded-full border border-blue-600 ${isOnline ? "bg-green-600" : "bg-gray-600"}`}
            ></div>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold tracking-wider truncate font-Raleway text-copy">
              {response.data.friendProfile.userName}
            </h1>
            <p className="text-xs font-medium tracking-wide truncate font-Raleway text-copylighter">
              {isOnline ? "online" : "offline"}
            </p>
          </div>
        </div>
      </div>
      <div className="relative inline-block cursor-pointer">
        <button type="button" onClick={showOptions}>
          <MoreVert fontSize="small" className="text-copy " />
        </button>
        {options && (
          <div className="absolute right-0 z-30 w-32 px-1 py-1 text-xs font-medium tracking-wider bg-indigo-600 divide-y-2 rounded top-8 divide-copylighter font-Raleway text-primarycontent">
            <Link
              to={`/admin/profile/${response.data.friendProfile._id}`}
              className="background_animations block w-full px-1 py-1.5 text-center hover:bg-indigo-800"
            >
              Profile
            </Link>
            <DeleteConversationButton
              friendId={response.data.friendProfile._id}
            />
            <BlockUserButton friendId={response.data.friendProfile._id} />
          </div>
        )}
      </div>
    </header>
  );
};

export default ChatHeader;

import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

import SocketContext from "../contextApi/socketContext";
import { setGeneralRoomAddOneMessage } from "../redux/chatLoomStore";
import { calculateDateForId } from "../utilities/calculator";

export default function useListenGeneralRoomMsgs() {
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("newGeneralRoomMessage", (newMessage) => {
      const inputDate = calculateDateForId(newMessage.createdAt);

      dispatch(setGeneralRoomAddOneMessage({ date: inputDate, newMessage }));
    });

    return () => {
      socket?.off("newGeneralRoomMessage");
    };
  }, [socket, dispatch]);
}

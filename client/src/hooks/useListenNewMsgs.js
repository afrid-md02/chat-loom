import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";

import SocketContext from "../contextApi/socketContext";
import { setAddOneMessage } from "../redux/chatLoomStore";
import { calculateDateForId } from "../utilities/calculator";

export default function useListenNewMsgs() {
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      const inputDate = calculateDateForId(newMessage.createdAt);

      dispatch(setAddOneMessage({ date: inputDate, newMessage }));
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, dispatch]);
}

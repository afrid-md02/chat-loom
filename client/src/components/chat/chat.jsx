import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import serverURL from "../../utilities/server_url";
import { setMessages } from "../../redux/chatLoomStore";

import Messages from "./messages";
import TextLoader from "../loaders/textLoader";
import ErrorTextLoader from "../loaders/errorTextLoader";
import BlockedLoader from "../loaders/blockedLoader";

const Chat = () => {
  const dispatch = useDispatch();
  const { friendId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const messages = useSelector((state) => state.store.messages);

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["chat-messages"],
    enabled: !!friendId && !!token,
    queryFn: () => {
      return axios.get(`${serverURL}/chat/conversation/${friendId}`, {
        headers: {
          Authorization: token,
        },
      });
    },
  });

  useEffect(() => {
    if (response && response.data) {
      dispatch(setMessages({ messages: response.data.messages }));
    }

    return () => {
      dispatch(setMessages({ messages: [] }));
    };
  }, [response, dispatch]);

  if (isLoading) {
    return <TextLoader>Loading messages...</TextLoader>;
  }

  if (isError) {
    return (
      <ErrorTextLoader>
        Some error occured, while fetching your messages
      </ErrorTextLoader>
    );
  }

  const messagesLength = messages.length;
  return (
    <section className="max-w-4xl mx-auto">
      {messagesLength !== 0 ? (
        <Messages data={messages} />
      ) : messagesLength === 0 && response.data.info ? (
        <BlockedLoader>{response.data.info}</BlockedLoader>
      ) : (
        <p className="px-2 py-8 text-xs font-medium tracking-wide text-center font-Raleway text-copy sm:text-sm">
          No messages found, start your conversation by sending messages
        </p>
      )}
    </section>
  );
};

export default Chat;

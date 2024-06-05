import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import serverURL from "../../utilities/server_url";
import { setGeneralRoomMessages } from "../../redux/chatLoomStore.js";

import GeneralRoomMessages from "./generalRoomMessages";
import TextLoader from "../loaders/textLoader";
import ErrorTextLoader from "../loaders/errorTextLoader";

const GeneraRoomChat = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const generalRoomMessages = useSelector(
    (state) => state.store.generalRoomMessages,
  );

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["generalroom-messages"],
    queryFn: () => {
      return axios.get(`${serverURL}/generalroom/all-messages`, {
        headers: {
          Authorization: token,
        },
      });
    },
  });

  useEffect(() => {
    if (response && response.data) {
      dispatch(
        setGeneralRoomMessages({ generalRoomMessages: response.data.messages }),
      );
    }

    return () => {
      dispatch(setGeneralRoomMessages({ generalRoomMessages: [] }));
    };
  }, [response, dispatch]);

  if (isLoading) {
    return <TextLoader>Loading messages...</TextLoader>;
  }

  if (isError) {
    return (
      <ErrorTextLoader>
        Some error occured, while fetching general room messages
      </ErrorTextLoader>
    );
  }

  const generalRoomMessagesLength = generalRoomMessages.length;
  return (
    <section className="max-w-4xl mx-auto">
      {generalRoomMessagesLength !== 0 ? (
        <GeneralRoomMessages generalRoomMessages={generalRoomMessages} />
      ) : (
        <p className="px-2 py-8 text-sm tracking-wide text-center font-Raleway text-copy">
          No messages found, start sending messages
        </p>
      )}
    </section>
  );
};

export default GeneraRoomChat;

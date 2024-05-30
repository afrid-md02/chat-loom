import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import serverURL from "../../utilities/server_url";

import GeneralRoomMessages from "./generalRoomMessages";
import TextLoader from "../loaders/textLoader";
import ErrorTextLoader from "../loaders/errorTextLoader";

const GeneraRoomChat = () => {
  const token = useSelector((state) => state.auth.token);

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

  const messagesLength = response.data.messages.length;
  return (
    <section className="max-w-4xl mx-auto">
      {messagesLength === 0 ? (
        <p className="px-2 py-8 text-sm tracking-wide text-center font-Raleway text-copy">
          No messages found, start sending messages
        </p>
      ) : (
        <GeneralRoomMessages messages={response.data.messages} />
      )}
    </section>
  );
};

export default GeneraRoomChat;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import serverURL from "../../../utilities/server_url";
import { setChats } from "../../../redux/chatLoomStore";

import MainText from "../../paragraphs/mainTxt";
import List from "../list";
import ListItem from "../../list items/chats/listItem";
import TextLoader from "../../loaders/textLoader";
import ErrorTextLoader from "../../loaders/errorTextLoader";

const ChatsList = ({ filteredChats }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: () => {
      return axios.get(`${serverURL}/user/friends`, {
        headers: {
          Authorization: token,
        },
      });
    },
  });

  useEffect(() => {
    if (response && response.data) {
      dispatch(setChats({ chats: response.data }));
    }
  }, [dispatch, response]);

  if (isLoading) {
    return <TextLoader>Loading your chats.....</TextLoader>;
  }

  if (isError) {
    return (
      <ErrorTextLoader>
        Some error occured, while fetching your chats
      </ErrorTextLoader>
    );
  }

  return (
    <>
      {filteredChats.length > 0 ? (
        <List>
          {filteredChats.map((friend) => {
            return <ListItem key={friend._id} friend={friend} />;
          })}
        </List>
      ) : (
        <MainText>
          No friends are found, start the conversation by adding them.
        </MainText>
      )}
    </>
  );
};

export default ChatsList;

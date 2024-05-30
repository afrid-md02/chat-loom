import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import serverURL from "../../utilities/server_url";

import Heading2 from "../../components/headings/h2/heading2";
import List from "../../components/lists/friends/list";
import ListItem from "../../components/list items/friends/listItem";
import MainText from "../../components/paragraphs/mainTxt";
import TextLoader from "../../components/loaders/textLoader";
import ErrorTextLoader from "../../components/loaders/errorTextLoader";

const FriendsPage = () => {
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

  if (isLoading) {
    return <TextLoader>Loading your friends.....</TextLoader>;
  }

  if (isError) {
    return (
      <ErrorTextLoader>
        Some error occured, while fetching your friends
      </ErrorTextLoader>
    );
  }

  const lengthOfFriends = response.data.length;

  return (
    <section className="max-w-5xl px-3 py-6 mx-auto space-y-3 sm:px-6">
      <Heading2>Friends</Heading2>
      {lengthOfFriends > 0 ? (
        <List>
          {response.data.map((friend) => {
            return <ListItem key={friend._id} user={friend} />;
          })}
        </List>
      ) : (
        <MainText>You have no friends...</MainText>
      )}
    </section>
  );
};

export default FriendsPage;

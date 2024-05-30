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

const BlockedUsersPage = () => {
  const token = useSelector((state) => state.auth.token);

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blocked-users"],
    queryFn: () => {
      return axios.get(`${serverURL}/user/blocked-users`, {
        headers: {
          Authorization: token,
        },
      });
    },
  });

  if (isLoading) {
    return <TextLoader>Loading blocked users.....</TextLoader>;
  }

  if (isError) {
    return (
      <ErrorTextLoader>
        Some error occured, while fetching blocked users
      </ErrorTextLoader>
    );
  }

  const lengthOfBlockedUsers = response.data.length;

  return (
    <section className="max-w-5xl px-3 py-6 mx-auto space-y-3 sm:px-6">
      <Heading2>Blocked members</Heading2>
      {lengthOfBlockedUsers > 0 ? (
        <List>
          {response.data.map((blockedUser) => {
            return <ListItem key={blockedUser._id} user={blockedUser} />;
          })}
        </List>
      ) : (
        <MainText>No blocked users found...</MainText>
      )}
    </section>
  );
};

export default BlockedUsersPage;

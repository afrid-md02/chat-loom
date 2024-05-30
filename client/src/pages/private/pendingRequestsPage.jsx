import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axios from "axios";

import serverURL from "../../utilities/server_url";

import Heading2 from "../../components/headings/h2/heading2";
import List from "../../components/lists/list";
import ListItem from "../../components/list items/pending requests/listItem";
import MainText from "../../components/paragraphs/mainTxt";
import TextLoader from "../../components/loaders/textLoader";
import ErrorTextLoader from "../../components/loaders/errorTextLoader";

const PendingRequestsPage = () => {
  const token = useSelector((state) => state.auth.token);

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pendingRequests"],
    queryFn: () => {
      return axios.get(`${serverURL}/user/pending-friendrequests`, {
        headers: {
          Authorization: token,
        },
      });
    },
  });

  if (isLoading) {
    return <TextLoader>Loading.....</TextLoader>;
  }

  if (isError) {
    return (
      <ErrorTextLoader>
        Some error occured, while fetching your pending requests
      </ErrorTextLoader>
    );
  }

  const lengthOfUsers = response.data.length;

  return (
    <section className="max-w-5xl px-3 py-3 mx-auto space-y-1 sm:px-6">
      <Heading2>Pending requests</Heading2>
      {lengthOfUsers > 0 ? (
        <List>
          {response.data.map((user) => {
            return <ListItem key={user._id} user={user} />;
          })}
        </List>
      ) : (
        <MainText>No pending friend requests found</MainText>
      )}
    </section>
  );
};

export default PendingRequestsPage;

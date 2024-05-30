import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import serverURL from "../../utilities/server_url";

import Heading2 from "../../components/headings/h2/heading2";
import List from "../../components/lists/list";
import ListItem from "../../components/list items/notifications/listItem";
import MainText from "../../components/paragraphs/mainTxt";
import TextLoader from "../../components/loaders/textLoader";
import ErrorTextLoader from "../../components/loaders/errorTextLoader";

const NotificationsPage = () => {
  const token = useSelector((state) => state.auth.token);
  
  const {
    data: notifications,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => {
      return axios.get(`${serverURL}/notification/all-notifications`, {
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
        Some error occured, while fetching your notifications
      </ErrorTextLoader>
    );
  }

  const lengthOfNotifications = notifications.data.length;

  return (
    <section className="max-w-5xl px-3 py-3 mx-auto space-y-1 sm:px-6">
      <Heading2>Notifications</Heading2>
      {lengthOfNotifications > 0 ? (
        <List>
          {notifications.data.map((notification) => {
            return (
              <ListItem key={notification._id} notification={notification} />
            );
          })}
        </List>
      ) : (
        <MainText>No notificatons found</MainText>
      )}
    </section>
  );
};

export default NotificationsPage;

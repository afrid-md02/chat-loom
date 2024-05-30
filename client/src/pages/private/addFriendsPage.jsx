import { useState } from "react";

import requestLinks from "../../utilities/requests";

import MainCard from "../../components/cards/mainCard";
import ListItem1 from "../../components/list items/add friends/listItem1";
import FindFriendsForm from "../../components/forms/findFriendsForm";
import Heading2 from "../../components/headings/h2/heading2";
import List from "../../components/lists/list";
import ListItem2 from "../../components/list items/add friends/listItem2";
import MainText from "../../components/paragraphs/mainTxt";

const AddFriendsPage = () => {
  const [searchedUsers, setSearchedUsers] = useState([]);

  return (
    <section className="background_animations space-y-3 px-3 pb-[3.75rem] pt-4 sm:px-6">
      <MainCard>
        {requestLinks.map((value, index) => {
          return <ListItem1 key={index} value={value} />;
        })}
      </MainCard>
      <div className="mx-auto max-w-5xl py-1.5">
        <FindFriendsForm setSearchedUsers={setSearchedUsers} />
      </div>
      <div className="max-w-5xl mx-auto space-y-1">
        <Heading2>Add friends</Heading2>
        {searchedUsers.length > 0 ? (
          <List>
            {searchedUsers.map((user) => {
              return <ListItem2 key={user._id} user={user} />;
            })}
          </List>
        ) : (
          <MainText>Start searching.....</MainText>
        )}
      </div>
    </section>
  );
};

export default AddFriendsPage;

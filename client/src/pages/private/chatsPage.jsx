import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import SearchButton from "../../components/buttons/searchBtn";
import Heading2 from "../../components/headings/h2/heading2";
import ChatsList from "../../components/lists/chats/list";

const ChatsPage = () => {
  const [filteredChats, setFilteredChats] = useState([]);
  const chats = useSelector((state) => state.store.chats);

  useEffect(() => {
    setFilteredChats(chats);
    return () => {
      setFilteredChats([]);
    };
  }, [chats]);

  async function submitHandler(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const userData = Object.fromEntries(fd.entries());
    const newFilteredArray = chats.filter((friend) =>
      friend.userName.includes(userData.name),
    );

    if (newFilteredArray.length === 0) {
      return toast.error("No friends found with given name", {
        position: "top-right",
      });
    }
    setFilteredChats(newFilteredArray);
  }

  return (
    <section className="background_animations mx-auto max-w-5xl space-y-3 px-3 pb-[4rem] pt-4 sm:px-6">
      <div className="py-1.5">
        <form className="flex" onSubmit={submitHandler}>
          <input
            type="text"
            name="name"
            placeholder="Search your friends....."
            className="searchInputStyle"
          />
          <SearchButton />
        </form>
      </div>
      <div className="space-y-1">
        <Heading2>Chats</Heading2>
        <ChatsList filteredChats={filteredChats} />
      </div>
    </section>
  );
};

export default ChatsPage;

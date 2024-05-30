import { useId } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import axios from "axios";

import serverURL from "../../utilities/server_url";

import SearchButton from "../buttons/searchBtn";

const FindFriendsForm = ({ setSearchedUsers }) => {
  const uId = useId();
  const token = useSelector((state) => state.auth.token);

  async function handleFindFriends(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const userData = Object.fromEntries(fd.entries());
    try {
      if (userData.searchedName.trim().length === 0) {
        throw new Error("Enter valid name");
      }
      const response = await axios.get(
        `${serverURL}/user/find-friends/${userData.searchedName.trim()}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (response.status === 200) {
        const data = await response.data;
        setSearchedUsers(data.users);
        return toast.success(data.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      let message = error?.response?.data?.error;
      if (!message) {
        message = error.message;
      }
      setSearchedUsers([]);
      return toast.error(message, {
        position: "top-right",
      });
    }
  }

  return (
    <form className="flex" onSubmit={handleFindFriends}>
      <input
        id={`${uId}-searchedName`}
        name="searchedName"
        type="text"
        placeholder="Search new friends....."
        className="searchInputStyle"
      />
      <SearchButton />
    </form>
  );
};

export default FindFriendsForm;

import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import serverURL from "../../utilities/server_url";

import TextLoader from "../../components/loaders/textLoader";
import ErrorTextLoader from "../../components/loaders/errorTextLoader";
import AddFriendButton from "../../components/buttons/addFriendBtn";
import RemoveFriendButton from "../../components/buttons/removeFriendBtn";
import UnBlockButton from "../../components/buttons/unBlockBtn";
import BlockButton from "../../components/buttons/blockBtn";

const FriendProfilePage = () => {
  const { friendId } = useParams();
  const token = useSelector((state) => state.auth.token);

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["friend-profile"],
    queryFn: () => {
      return axios.get(`${serverURL}/user/friend-profile/${friendId}`, {
        headers: {
          Authorization: token,
        },
      });
    },
  });

  if (isLoading) {
    return <TextLoader>Loading user profile.....</TextLoader>;
  }

  if (isError) {
    return (
      <ErrorTextLoader>
        Failed to fetch user profile, please try again
      </ErrorTextLoader>
    );
  }

  const friendProfile = response.data.friendProfile;
  const isFriend = response.data.isFriend;
  const isBlocked = response.data.isBlocked;

  return (
    <section className="background_animations mx-auto flex max-w-5xl flex-col space-y-12 px-3 pb-[6rem] pt-8 sm:px-6 md:flex-row md:space-y-0">
      <div className="flex items-start justify-center w-full">
        <img
          src={friendProfile.profilePicture}
          alt="Profile Preview"
          className="object-contain w-1/2 h-auto rounded"
        />
      </div>
      <div className="w-full ">
        <div className="w-full max-w-md px-4 mx-auto space-y-4 background_animations rounded-xl font-Raleway md:w-full md:max-w-none md:space-y-6 md:px-0">
          <div className="relative">
            <input
              id="userName"
              name="userName"
              type="text"
              defaultValue={friendProfile.userName}
              className="peer w-full rounded-lg border-2 border-border bg-inherit px-2 py-2.5 text-xs tracking-widest text-copy placeholder-transparent outline-none sm:text-sm"
              placeholder="Username"
              autoComplete="off"
              disabled
            />
            <label
              htmlFor="userName"
              className="absolute -top-2.5 left-2 bg-background px-1 text-xs text-primarylight transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-focus:-top-2.5 peer-focus:text-xs sm:peer-placeholder-shown:top-3 sm:peer-placeholder-shown:text-sm sm:peer-focus:-top-2.5 sm:peer-focus:text-xs"
            >
              Username
            </label>
          </div>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={friendProfile.email}
              className="peer w-full rounded-lg border-2 border-border bg-inherit px-2 py-2.5 text-xs tracking-widest text-copy placeholder-transparent outline-none sm:text-sm"
              placeholder="Email address"
              autoComplete="off"
              disabled
            />
            <label
              htmlFor="userName"
              className="absolute -top-2.5 left-2 bg-background px-1 text-xs text-primarylight transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-focus:-top-2.5 peer-focus:text-xs sm:peer-placeholder-shown:top-3 sm:peer-placeholder-shown:text-sm sm:peer-focus:-top-2.5 sm:peer-focus:text-xs"
            >
              Email address
            </label>
          </div>
          <select
            name="gender"
            id="gender"
            defaultValue={friendProfile.gender}
            className="w-full px-4 py-2 text-xs border-2 rounded-lg outline-none appearance-none border-border bg-inherit text-primarylight focus-within:bg-background focus-within:text-copy sm:text-sm"
            required
            disabled
          >
            <option value="male" className="py-4">
              Male
            </option>
            <option value="female" className="p-2">
              Female
            </option>
          </select>
          <textarea
            type="text"
            name="bio"
            placeholder="user bio is empty..."
            defaultValue={friendProfile.bio}
            className="h-24 w-full rounded-md border-2 border-border bg-inherit px-1.5 py-1 text-xs tracking-wider text-copy outline-none placeholder:font-medium placeholder:tracking-wide md:h-32 md:text-sm"
            disabled
          />
          <div className="flex flex-col items-center justify-center w-full space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            {isFriend ? (
              <>
                {isBlocked ? (
                  <UnBlockButton friendId={friendProfile._id} />
                ) : (
                  <BlockButton friendId={friendProfile._id} />
                )}
                <RemoveFriendButton friendId={friendProfile._id} />
              </>
            ) : (
              <AddFriendButton receiverId={friendId} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default FriendProfilePage;

import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import serverURL from "../../utilities/server_url";

import EditProfileForm from "../../components/forms/editProfileForm";
import ProfileImagePreview from "../../components/profile page data/profileImagePreview";
import MainCard from "../../components/cards/mainCard";
import ListItem from "../../components/list items/profile/listItem";
import TextLoader from "../../components/loaders/textLoader";
import ErrorTextLoader from "../../components/loaders/errorTextLoader";

const ProfilePage = () => {
  const token = useSelector((state) => state.auth.token);

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => {
      return axios.get(`${serverURL}/user/profile`, {
        headers: { Authorization: token },
      });
    },
  });

  if (isLoading) {
    return <TextLoader>Loading your profile.....</TextLoader>;
  }

  if (isError) {
    return (
      <ErrorTextLoader>
        Failed to fetch your profile, please try again
      </ErrorTextLoader>
    );
  }

  return (
    <section className="background_animations mx-auto flex max-w-5xl flex-col space-y-3 px-3 pb-[6rem] pt-8 sm:px-6 md:flex-row md:space-y-0">
      <ProfileImagePreview userData={user.data} />
      <div className="w-full">
        <EditProfileForm userData={user.data} />
        <div className="flex justify-center px-4 py-4">
          <Link
            to="/admin/change-password"
            className="text-xs font-medium tracking-wide font-Raleway text-primarylight hover:text-primarydark sm:text-sm"
          >
            Change password ?
          </Link>
        </div>
        <MainCard>
          <ListItem
            to="/admin/friends"
            name="Friends"
            value={user.data.friends}
          />
          <ListItem
            to="/admin/blocked-users"
            name="Blocked"
            value={user.data.blocked}
          />
        </MainCard>
      </div>
    </section>
  );
};

export default ProfilePage;

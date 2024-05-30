import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Notifications } from "@mui/icons-material";
import axios from "axios";

import serverURL from "../../utilities/server_url";

import UserNameHeading from "../headings/h1/userNameHeading";
import TextLoader from "../loaders/textLoader";
import ErrorTextLoader from "../loaders/errorTextLoader";

const HeaderContent = () => {
  const darkMode = useSelector((state) => state.auth.darkMode);
  const token = useSelector((state) => state.auth.token);

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["header-data"],
    queryFn: () => {
      return axios.get(`${serverURL}/user/header-data`, {
        headers: {
          Authorization: token,
        },
      });
    },
  });

  if (isLoading) {
    return <TextLoader>Loading your data.....</TextLoader>;
  }

  if (isError) {
    return (
      <ErrorTextLoader>
        Some error occured, while fetching your data
      </ErrorTextLoader>
    );
  }

  return (
    <>
      <div className="flex items-center space-x-2 font-Raleway">
        <img
          src={response.data.profilePicture}
          alt="profile picture"
          onError={(e) => {
            e.target.src = "../../assets/profile error fallback.svg";
          }}
          className="w-12 h-12 border-4 rounded-full object-fit border-primary"
        />
        <div className="flex-col items-center justify-center">
          <UserNameHeading userName={response.data.userName} />
          <p className="text-xs font-semibold text-copylighter">
            welcome back!
          </p>
        </div>
      </div>
      <Link
        to="/admin/notifications"
        className="relative flex items-center justify-center  rounded-full border-2 border-slate-400 bg-foreground p-1.5 text-slate-400"
      >
        <Notifications
          fontSize="small"
          className={`${darkMode ? "fill-slate-700" : "fill-slate-300"}`}
        />
        {response.data.notifications > 0 && (
          <div className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-red-600"></div>
        )}
      </Link>
    </>
  );
};

export default HeaderContent;

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { toast } from "sonner";
import Cookies from "js-cookie";

import { resetAuthState } from "../../redux/auth";
import { resetChatStore } from "../../redux/chatLoomStore";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.auth.darkMode);

  async function logoutCurrentUser() {
    toast.warning("Are you sure you want to log out?", {
      important: true,
      duration: 10000,
      closeButton: false,
      position: "top-center",
      cancel: {
        label: "Cancel",
        onClick: () => console.log("Logout cancelled"),
      },
      action: {
        label: "Yes",
        onClick: () => {
          Cookies.remove("jwt_token");
          Cookies.remove("chatLoom_userId");
          Cookies.remove("chatLoom_userName");
          Cookies.remove("chatLoom_userEmail");
          Cookies.remove("chatLoom_userProfilePicture");
          dispatch(resetAuthState());
          dispatch(resetChatStore());
          toast.success("Logged out successfully", { position: "top-center" });
          return navigate("/", { replace: true });
        },
      },
    });
  }

  return (
    <button
      onClick={logoutCurrentUser}
      type="button"
      className="background_animations group flex w-full max-w-xs items-center justify-center space-x-2 rounded-lg border-2 border-custompink  bg-custompink px-2 py-1.5 active:bg-transparent md:hover:bg-transparent"
    >
      <p
        className={`font-Raleway text-xs font-medium tracking-wider text-primarycontent sm:text-sm ${!darkMode && "group-active:text-custompink md:group-hover:text-custompink"}`}
      >
        Logout
      </p>
      <Logout
        className={`text-primarycontent ${!darkMode && "group-active:text-custompink md:group-hover:text-custompink"}`}
        fontSize="medium"
      />
    </button>
  );
};

export default LogoutButton;

import { useCallback } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import { setDataFromCookies } from "../redux/auth";


export default function useInitialValues(
  darkmode,
  jwt_token,
  chatLoom_userId,
  chatLoom_userName,
  chatLoom_userEmail,
  chatLoom_userProfilePicture,
) {
  const dispatch = useDispatch();

  const fetchDataFromCookies = useCallback(async () => {
    try {
      const darkMode = !!localStorage.getItem(darkmode);
      if (darkMode) {
        document.body.classList.add("dark");
        document.body.classList.remove("light");
      }

      const token = Cookies.get(jwt_token);
      const isLoggedIn = !!token;
      const userId = Cookies.get(chatLoom_userId);
      const userName = Cookies.get(chatLoom_userName);
      const userEmail = Cookies.get(chatLoom_userEmail);
      const userProfilePicture = Cookies.get(chatLoom_userProfilePicture);

      dispatch(
        setDataFromCookies({
          darkMode: darkMode,
          token: token,
          isLoggedIn: isLoggedIn,
          user: { userId, userName, userEmail, userProfilePicture },
        }),
      );
    } catch (err) {
      console.log("Failed to fetch data from cookies", err);
    }
  }, [
    darkmode,
    jwt_token,
    chatLoom_userId,
    chatLoom_userName,
    chatLoom_userEmail,
    chatLoom_userProfilePicture,
    dispatch,
  ]);

  return { fetchDataFromCookies };
}

import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import { setLogin } from "../redux/auth";

export default function useLogin(baseURL) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //mutate login user
  const mutateLogin = useCallback(
    async (userData) => {
      if (!userData.email.includes("@") || !userData.email.includes(".com")) {
        throw new Error("Enter valid email.");
      }
      if (userData.password.trim().length < 6) {
        throw new Error("Password must be min:6 characters in length.");
      }
      return await axios.post(baseURL, userData);
    },
    [baseURL],
  );

  const onSuccessLogin = useCallback(
    async (response) => {
      if (response.status === 200) {
        const data = await response.data;
        //set cookies
        Cookies.set("jwt_token", data.token, { expires: 0.5 });
        Cookies.set("chatLoom_userId", data.user._id, { expires: 0.5 });
        Cookies.set("chatLoom_userName", data.user.userName, { expires: 0.5 });
        Cookies.set("chatLoom_userEmail", data.user.email, { expires: 0.5 });
        Cookies.set("chatLoom_userProfilePicture", data.user.profilePicture, {
          expires: 0.5,
        });
        //set data in redux store
        dispatch(
          setLogin({
            token: data.token,
            user: {
              userId: data.user._id,
              userName: data.user.userName,
              userEmail: data.user.email,
              userProfilePicture: data.user.profilePicture,
            },
          }),
        );
        toast.success(data.message, {
          position: "top-center",
        });
        return navigate("/admin", { replace: true });
      }
    },
    [dispatch, navigate],
  );

  const onErrorLogin = useCallback(async (error) => {
    let message = error?.response?.data?.error;
    if (!message) {
      message = error.message;
    }
    toast.error(message, {
      position: "top-right",
    });
  }, []);

  return { mutateLogin, onSuccessLogin, onErrorLogin };
}

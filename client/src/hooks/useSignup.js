import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

export default function useSignup(baseURL) {
  const navigate = useNavigate();

  //mutate signup user
  const mutateSignup = useCallback(
    async (userData) => {
      if (userData.userName.trim().length < 4) {
        throw new Error("Username must be min:4 characters in length.");
      }
      if (!userData.email.includes("@") || !userData.email.includes(".com")) {
        throw new Error("Enter valid email.");
      }
      if (
        userData.gender === undefined ||
        userData.gender === null ||
        userData.gender.trim() === ""
      ) {
        throw new Error("Please select gender.");
      }
      if (userData.password.trim().length < 6) {
        throw new Error("Password must be min:6 characters in length.");
      }
      if (userData.password.trim() !== userData.confirmPassword.trim()) {
        throw new Error("Passwords must match.");
      }
      return await axios.post(baseURL, userData);
    },
    [baseURL],
  );

  const onSuccessSignup = useCallback(
    async (response) => {
      if (response.status === 201) {
        const data = await response.data;
        toast.success(data.message, {
          position: "top-center",
        });
        return navigate("/");
      }
    },
    [navigate],
  );

  const onErrorSignup = useCallback(async (error) => {
    let message = error?.response?.data?.error;
    if (!message) {
      message = error.message;
    }
    toast.error(message, {
      position: "top-right",
    });
  }, []);

  return { mutateSignup, onSuccessSignup, onErrorSignup };
}

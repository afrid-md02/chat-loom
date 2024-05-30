import { useCallback } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";

export default function useChangeProfilePic(baseURL) {
  const token = useSelector((state) => state.auth.token);

  //mutate change profile picture
  const mutateChangeProfilePic = useCallback(
    async (file) => {
      if (!file) {
        throw new Error("Please choose a image");
      }

      return await axios.post(
        baseURL,
        { profilePicture: file },
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        },
      );
    },
    [baseURL, token],
  );

  const onSuccessChangeProfilePic = useCallback(async (response) => {
    if (response.status === 201) {
      const data = await response.data;
      toast.success(data.message, {
        position: "top-center",
      });
    }
  }, []);

  const onErrorChangeProfilePic = useCallback(async (error) => {
    let message = error?.response?.data?.error;
    if (!message) {
      message = error.message;
    }
    toast.error(message, {
      position: "top-right",
    });
  }, []);

  return {
    mutateChangeProfilePic,
    onSuccessChangeProfilePic,
    onErrorChangeProfilePic,
  };
}

import { useCallback } from "react";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import axios from "axios";

export default function useRemoveFriend(baseURL) {
  const token = useSelector((state) => state.auth.token);

  //mutate remove friend
  const mutateRemoveFriend = useCallback(async () => {
    return await axios.delete(baseURL, {
      headers: {
        Authorization: token,
      },
    });
  }, [baseURL, token]);

  //handle success
  const onSuccessRemoveFriend = useCallback(async (response) => {
    if (response.status === 200) {
      const data = await response.data;
      toast.success(data.message, {
        position: "top-center",
      });
    }
  }, []);

  //handle error
  const onErrorRemoveFriend = useCallback(async (error) => {
    let message = error?.response?.data?.error;
    if (!message) {
      message = error.message;
    }
    toast.error(message, {
      position: "top-right",
    });
  }, []);

  return {
    mutateRemoveFriend,
    onSuccessRemoveFriend,
    onErrorRemoveFriend,
  };
}

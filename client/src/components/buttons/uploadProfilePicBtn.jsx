import { CloudUpload } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";

import useChangeProfilePic from "../../hooks/useChangeProfilePic";
import serverURL from "../../utilities/server_url";

const UploadProfilePicButton = ({
  selectedFile,
  setProfilePicture,
  updateProfilePicture,
}) => {
  const {
    mutateChangeProfilePic,
    onSuccessChangeProfilePic,
    onErrorChangeProfilePic,
  } = useChangeProfilePic(`${serverURL}/user/update-profilePicture`);
  const { mutate, isPending } = useMutation({
    mutationFn: mutateChangeProfilePic,
    onSuccess: (response) => {
      onSuccessChangeProfilePic(response);
      if (response.status === 201) {
        setProfilePicture(null);
        updateProfilePicture(response.data.profileUrl);
      }
    },
    onError: onErrorChangeProfilePic,
  });

  async function changeProfilePicture() {
    mutate(selectedFile);
  }

  return (
    <button
      onClick={changeProfilePicture}
      type="button"
      className="flex items-center px-4 py-2 space-x-2 rounded-full background_animations bg-primary text-primarycontent hover:bg-primarydark"
    >
      {isPending ? (
        <>
          <CloudUpload className="animate-pulse" />
          <p className="text-xs font-medium tracking-wide animate-pulse font-BrunoAceSC">
            Uploading...
          </p>
        </>
      ) : (
        <>
          <CloudUpload />
          <p className="text-xs font-medium tracking-wide font-BrunoAceSC">
            Upload
          </p>
        </>
      )}
    </button>
  );
};

export default UploadProfilePicButton;

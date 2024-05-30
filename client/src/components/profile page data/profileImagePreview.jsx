import { useCallback, useState } from "react";

import UploadProfilePicButton from "../buttons/uploadProfilePicBtn";

const ProfileImagePreview = ({ userData }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [imagePreview, setImagePreview] = useState(userData.profilePicture);

  async function handleImageChange(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      setProfilePicture(selectedFile);
    }
  }

  const updateProfilePicture = useCallback((imageUrl) => {
    setImagePreview(imageUrl);
  }, []);

  return (
    <div className="w-full py-2 space-y-4 md:pb-6">
      <div className="flex items-center justify-center">
        <img
          src={imagePreview}
          alt="Profile Preview"
          className="object-contain w-1/2 h-auto rounded"
        />
      </div>
      <div className="flex flex-col items-center w-full space-y-2 text-copy">
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden text-xs sm:text-sm"
        />
        <label
          htmlFor="profilePicture"
          className="block px-4 py-1 text-xs font-medium tracking-wide bg-orange-600 rounded cursor-pointer font-Raleway text-primarycontent sm:text-sm"
        >
          Change profile picture
        </label>
        {profilePicture && (
          <UploadProfilePicButton
            selectedFile={profilePicture}
            setProfilePicture={setProfilePicture}
            updateProfilePicture={updateProfilePicture}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileImagePreview;

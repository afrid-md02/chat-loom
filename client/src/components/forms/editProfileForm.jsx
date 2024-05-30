import { useMutation } from "@tanstack/react-query";

import serverURL from "../../utilities/server_url";
import useUpdateProfile from "../../hooks/useUpdateProfile";

import CommonInput from "../label & inputs/commonInput";
import SubmitButton from "../buttons/submitBtn";
import LoadingButton from "../buttons/loadingBtn";

const EditProfileForm = ({ userData }) => {
  const { mutateUpdateProfile, onSuccessUpdateProfile, onErrorUpdateProfile } =
    useUpdateProfile(`${serverURL}/user/update-profile`);
  const { mutate, isPending } = useMutation({
    mutationFn: mutateUpdateProfile,
    onSuccess: onSuccessUpdateProfile,
    onError: onErrorUpdateProfile,
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newUserData = Object.fromEntries(formData.entries());
    mutate(newUserData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md px-4 mx-auto space-y-4 background_animations rounded-xl font-Raleway md:w-full md:max-w-none md:space-y-6 md:px-0"
    >
      <CommonInput
        content="User name"
        id="userName"
        name="userName"
        type="text"
        placeholder="User name"
        autoComplete="username"
        defaultValue={userData.userName}
        bgColor={true}
      />
      <div className="relative">
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={userData.email}
          placeholder="Email address"
          autoComplete="off"
          disabled
          className="peer w-full rounded-lg border-2 border-border bg-inherit px-2 py-2.5 text-xs tracking-widest text-copy placeholder-transparent outline-none sm:text-sm"
        />
        <label
          htmlFor="userName"
          className="absolute -top-2.5 left-2 bg-background px-1 text-xs text-primarylight transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-focus:-top-2.5 peer-focus:text-xs sm:peer-placeholder-shown:top-3 sm:peer-placeholder-shown:text-sm sm:peer-focus:-top-2.5 sm:peer-focus:text-xs"
        >
          Email address
        </label>
      </div>
      <select
        name="gender"
        id="gender"
        defaultValue={userData.gender}
        required
        className="w-full px-4 py-2 text-xs border-2 rounded-lg outline-none appearance-none border-border bg-inherit text-primarylight focus-within:bg-background focus-within:text-copy sm:text-sm"
      >
        <option value="male" className="py-4">
          Male
        </option>
        <option value="female" className="p-2">
          Female
        </option>
      </select>
      <textarea
        type="text"
        name="bio"
        placeholder="your bio is empty..."
        defaultValue={userData.bio}
        className="h-24 w-full rounded-md border-2 border-border bg-inherit px-1.5 py-1 text-xs tracking-wider text-copy outline-none placeholder:font-medium placeholder:tracking-wide md:h-32 md:text-sm"
      />
      {isPending ? (
        <LoadingButton />
      ) : (
        <SubmitButton>Update details</SubmitButton>
      )}
    </form>
  );
};

export default EditProfileForm;

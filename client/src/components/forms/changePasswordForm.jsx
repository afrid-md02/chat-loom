import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import useChangePassword from "../../hooks/useChangePassword.js";
import serverURL from "../../utilities/server_url.js";

import FormsText from "../paragraphs/formsTxt.jsx";
import PasswordInput from "../label & inputs/passwordInput.jsx";
import PasswordCheckbox from "../label & inputs/passwordCheckbox.jsx";
import SubmitButton from "../buttons/submitBtn";
import LoadingButton from "../buttons/loadingBtn";

const ChangePasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    mutateChangePassword,
    onSuccessChangePassword,
    onErrorChangePassword,
  } = useChangePassword(`${serverURL}/auth/update-password`);
  const { mutate, isPending } = useMutation({
    mutationFn: mutateChangePassword,
    onSuccess: onSuccessChangePassword,
    onError: onErrorChangePassword,
  });

  async function handleChangePassword(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const userData = Object.fromEntries(fd.entries());
    mutate(userData);
  }

  return (
    <form className="formStyles" onSubmit={handleChangePassword}>
      <FormsText>Enter your old password to change</FormsText>
      <PasswordInput
        content="Old password"
        id="oldPassword"
        name="oldPassword"
        placeholder="Old password"
        autoComplete="old-password"
        showPassword={showPassword}
      />
      <PasswordInput
        content="New password"
        id="newPassword"
        name="newPassword"
        placeholder="New password"
        autoComplete="new-password"
        showPassword={showPassword}
      />
      <PasswordInput
        content="Confirm new password"
        id="confirmNewPassword"
        name="confirmNewPassword"
        placeholder="Confrim new password"
        autoComplete="confrim-new-password"
        showPassword={showPassword}
      />
      <PasswordCheckbox
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      {isPending ? (
        <LoadingButton />
      ) : (
        <SubmitButton>Update password</SubmitButton>
      )}
    </form>
  );
};

export default ChangePasswordForm;

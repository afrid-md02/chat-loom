import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import useResetPassword from "../../hooks/useResetPassword";
import serverURL from "../../utilities/server_url";

import FormsText from "../paragraphs/formsTxt";
import PasswordInput from "../label & inputs/passwordInput";
import PasswordCheckbox from "../label & inputs/passwordCheckbox";
import SubmitButton from "../buttons/submitBtn";
import LoadingButton from "../buttons/loadingBtn";

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { userId, resetToken } = useParams();

  const { mutateResetPassword, onSuccessResetPassword, onErrorResetPassword } =
    useResetPassword(`${serverURL}/auth/reset-password/${userId}`);
  const { mutate, isPending } = useMutation({
    mutationFn: mutateResetPassword,
    onSuccess: onSuccessResetPassword,
    onError: onErrorResetPassword,
  });

  async function handleResetPassword(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const userData = Object.fromEntries(fd.entries());
    mutate({ userData, resetToken });
  }

  return (
    <form className="formStyles" onSubmit={handleResetPassword}>
      <FormsText>Create your new password</FormsText>
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
        placeholder="Confirm new password"
        autoComplete="new-password"
        showPassword={showPassword}
      />
      <PasswordCheckbox
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      {isPending ? (
        <LoadingButton />
      ) : (
        <SubmitButton>Reset password</SubmitButton>
      )}
    </form>
  );
};

export default ResetPasswordForm;

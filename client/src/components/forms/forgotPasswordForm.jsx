import { useMutation } from "@tanstack/react-query";

import useForgotPassword from "../../hooks/useForgotPassword";
import serverURL from "../../utilities/server_url.js";

import FormsText from "../paragraphs/formsTxt.jsx";
import CommonInput from "../label & inputs/commonInput";
import SubmitButton from "../buttons/submitBtn";
import LoadingButton from "../buttons/loadingBtn";

const ForgotPasswordForm = () => {
  const {
    mutateForgotPassword,
    onSuccessForgotPassword,
    onErrorForgotPassword,
  } = useForgotPassword(`${serverURL}/auth/forgot-password`);
  const { mutate, isPending } = useMutation({
    mutationFn: mutateForgotPassword,
    onSuccess: onSuccessForgotPassword,
    onError: onErrorForgotPassword,
  });

  async function handleForgotPassword(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const userData = Object.fromEntries(fd.entries());
    mutate(userData);
  }

  return (
    <form className="formStyles" onSubmit={handleForgotPassword}>
      <FormsText>Enter your email to get password reset link</FormsText>
      <CommonInput
        content="Email Address"
        id="email"
        name="email"
        type="email"
        placeholder="Email Address"
        autoComplete="off"
      />
      {isPending ? <LoadingButton /> : <SubmitButton>Get Link</SubmitButton>}
    </form>
  );
};

export default ForgotPasswordForm;

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import useSignup from "../../hooks/useSignup";
import serverURL from "../../utilities/server_url";

import FormsHeading from "../headings/h5/formsHeading";
import CommonInput from "../label & inputs/commonInput";
import PasswordInput from "../label & inputs/passwordInput";
import PasswordCheckbox from "../label & inputs/passwordCheckbox";
import SignupSelect from "../label & inputs/genderSelect";
import SubmitButton from "../buttons/submitBtn";
import LoadingButton from "../buttons/loadingBtn";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { mutateSignup, onSuccessSignup, onErrorSignup } = useSignup(
    `${serverURL}/auth/signup`,
  );
  const { mutate, isPending } = useMutation({
    mutationFn: mutateSignup,
    onSuccess: onSuccessSignup,
    onError: onErrorSignup,
  });

  async function handleSignup(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const userData = Object.fromEntries(fd.entries());
    mutate(userData);
  }

  return (
    <form className="formStyles" onSubmit={handleSignup}>
      <FormsHeading>Signup</FormsHeading>
      <CommonInput
        content="User name"
        id="userName"
        name="userName"
        type="text"
        placeholder="User name"
        autoComplete="username"
      />
      <CommonInput
        content="Email Address"
        id="email"
        name="email"
        type="email"
        placeholder="Email Address"
        autoComplete="off"
      />
      <SignupSelect />
      <PasswordInput
        content="Password"
        id="password"
        name="password"
        placeholder="Password"
        autoComplete="new-password"
        showPassword={showPassword}
      />
      <PasswordInput
        content="Confirm Password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm Password"
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
        <SubmitButton>Create account</SubmitButton>
      )}
    </form>
  );
};

export default SignupForm;

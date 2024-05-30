import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import useLogin from "../../hooks/useLogin";
import serverURL from "../../utilities/server_url";

import FormsHeading from "../headings/h5/formsHeading";
import CommonInput from "../label & inputs/commonInput";
import SubmitButton from "../buttons/submitBtn";
import LoadingButton from "../buttons/loadingBtn";
import PasswordInput from "../label & inputs/passwordInput";
import PasswordCheckbox from "../label & inputs/passwordCheckbox";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { mutateLogin, onSuccessLogin, onErrorLogin } = useLogin(
    `${serverURL}/auth/login`,
  );
  const { mutate, isPending } = useMutation({
    mutationFn: mutateLogin,
    onSuccess: onSuccessLogin,
    onError: onErrorLogin,
  });

  async function handleLogin(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const userData = Object.fromEntries(fd.entries());
    mutate(userData);
  }

  return (
    <form className="formStyles" onSubmit={handleLogin}>
      <FormsHeading>Welcome back! 👋</FormsHeading>
      <CommonInput
        content="Email Address"
        id="email"
        name="email"
        type="email"
        placeholder="Email Address"
        autoComplete="off"
      />
      <PasswordInput
        content="Password"
        id="password"
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        showPassword={showPassword}
      />
      <PasswordCheckbox
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      {isPending ? <LoadingButton /> : <SubmitButton>Login</SubmitButton>}
      <Link
        to="/forgot-password"
        className="block text-xs font-medium tracking-wider text-center text-blue-600 hover:text-blue-900 sm:text-sm"
      >
        forgot password?
      </Link>
    </form>
  );
};

export default LoginForm;

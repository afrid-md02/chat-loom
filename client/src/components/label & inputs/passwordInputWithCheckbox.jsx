import { useState } from "react";

import PasswordCheckbox from "./passwordCheckbox";
import PasswordInput from "./passwordInput";

const PasswordInputWithCheckbox = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
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
    </>
  );
};

export default PasswordInputWithCheckbox;

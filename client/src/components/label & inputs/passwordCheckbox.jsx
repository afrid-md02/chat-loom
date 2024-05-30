const PasswordCheckbox = ({ showPassword, setShowPassword }) => {
  async function showPasswordHandler() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="flex items-center w-full ml-1 space-x-2 text-xs font-medium text-copy">
      <input
        type="checkbox"
        className="outline-none accent-primary"
        id="checkbox"
        name="checkbox"
        onChange={showPasswordHandler}
      />
      <label htmlFor="checkbox">Show Password</label>
    </div>
  );
};

export default PasswordCheckbox;

import { useId } from "react";

const PasswordInput = ({
  content,
  id,
  name,
  placeholder,
  autoComplete,
  showPassword,
}) => {
  const uId = useId();

  return (
    <div className="relative">
      <input
        id={`${uId}-${id}`}
        name={name}
        type={showPassword ? "text" : "password"}
        className="peer w-full rounded-lg border-2 border-border bg-inherit px-2 py-2.5 text-xs tracking-widest text-copy placeholder-transparent outline-none sm:text-sm"
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
      />
      <label
        htmlFor={`${uId}-${id}`}
        className="absolute -top-2.5 left-2 bg-foreground px-1 text-xs text-primarylight transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-focus:-top-2.5 peer-focus:text-xs sm:peer-placeholder-shown:top-3 sm:peer-placeholder-shown:text-sm sm:peer-focus:-top-2.5 sm:peer-focus:text-xs"
      >
        {content}
      </label>
    </div>
  );
};

export default PasswordInput;

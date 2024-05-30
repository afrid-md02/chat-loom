const GenderSelect = () => {
  return (
    <select
      name="gender"
      id="gender"
      className="w-full px-4 py-2 text-xs border-2 rounded-lg outline-none appearance-none border-border bg-inherit text-primarylight focus-within:bg-background focus-within:text-copy sm:text-sm"
      defaultValue=""
      required
    >
      <option hidden value="" className="py-4">
        Select Gender
      </option>
      <option value="male" className="py-4">
        Male
      </option>
      <option value="female" className="p-2">
        Female
      </option>
    </select>
  );
};

export default GenderSelect;

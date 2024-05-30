import { useId } from "react";

import SearchButton from "../buttons/searchBtn";

const SearchForm = ({ id, name, placeholder }) => {
  const uId = useId();

  return (
    <form className="flex">
      <input
        id={`${uId}-${id}`}
        type="text"
        name={name}
        placeholder={placeholder}
        className="w-full rounded rounded-r-none border-2 border-r-0 border-blue-600 bg-foreground p-1.5 font-Raleway text-xs font-medium text-copy outline-none focus-within:bg-border"
      />
      <SearchButton />
    </form>
  );
};

export default SearchForm;

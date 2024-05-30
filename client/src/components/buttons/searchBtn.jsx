import { Search } from "@mui/icons-material";

const SearchButton = () => {
  return (
    <button
      type="submit"
      className="w-auto rounded rounded-l-none bg-blue-600 px-3 py-1.5 text-primarycontent"
    >
      <Search fontSize="medium" />
    </button>
  );
};

export default SearchButton;

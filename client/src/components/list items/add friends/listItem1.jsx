import { Link } from "react-router-dom";
import { ChevronRight } from "@mui/icons-material";

const ListItem1 = ({ value }) => {
  return (
    <li className="font-medium tracking-wide font-Raleway hover:bg-background">
      <Link
        to={value.link}
        className="flex justify-between w-full px-1 py-2 text-copy"
      >
        <span>{value.name}</span>
        <span className="flex items-center space-x-2 text-primarylight">
          <ChevronRight className="text-copy" fontSize="small" />
        </span>
      </Link>
    </li>
  );
};

export default ListItem1;

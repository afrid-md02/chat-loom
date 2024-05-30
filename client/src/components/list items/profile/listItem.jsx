import { Link } from "react-router-dom";
import { ChevronRight } from "@mui/icons-material";

const ListItem = ({ to, name, value }) => {
  return (
    <li className="text-xs font-medium tracking-wider font-Raleway hover:bg-background sm:text-sm">
      <Link to={to} className="flex justify-between w-full px-1 py-2 text-copy">
        <span>{name} :</span>
        <span className="flex items-center space-x-2 text-primarylight">
          <p>{value}</p>
          <ChevronRight className="text-copy" fontSize="small" />
        </span>
      </Link>
    </li>
  );
};

export default ListItem;

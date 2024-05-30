import { Link } from "react-router-dom";
import { ChevronRight } from "@mui/icons-material";

import generalRoom from "../../../utilities/generalRoom";

const ListItem = () => {
  return (
    <li className="px-1 py-3 background_animations font-Raleway hover:bg-foreground sm:py-4">
      <Link to={generalRoom.pathname}>
        <div className="flex items-center space-x-4">
          <div className="relative flex-shrink-0">
            <img
              className="object-contain w-10 h-10 border-2 border-blue-600 rounded-full"
              src={generalRoom.profilePicture}
              alt={generalRoom.name}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium tracking-wide truncate text-copy">
              {generalRoom.name}
            </p>
          </div>
          <div className="inline-flex items-center p-1 rounded-md text-copylight">
            <ChevronRight fontSize="small" />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default ListItem;

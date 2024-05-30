import { Link } from "react-router-dom";
import { ChevronRight } from "@mui/icons-material";

const ListItem2 = ({ user }) => {
  return (
    <li className="px-1 py-3 background_animations font-Raleway hover:bg-foreground sm:py-4">
      <Link to={`/admin/profile/${user._id}`}>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img
              className="object-contain w-10 h-10 border-2 border-blue-600 rounded-full"
              src={user.profilePicture}
              alt={user.userName}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium tracking-wide truncate text-copy">
              {user.userName}
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

export default ListItem2;

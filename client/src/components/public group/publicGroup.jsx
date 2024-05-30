import { Link } from "react-router-dom";
import { ChevronRight } from "@mui/icons-material";

const PublicGroup = () => {
  const publicgroup = {
    id: 1,
    name: "Place for all",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8",
    status: false,
  };

  return (
    <div className="px-1 py-3 background_animations hover:bg-foreground sm:py-4">
      <Link to="/publicgroup/id">
        <div className="flex items-center space-x-4">
          <div className="relative flex-shrink-0">
            <img
              className="object-contain w-10 h-10 border-2 border-blue-600 rounded-full"
              src={publicgroup.imageUrl}
              alt={publicgroup.name}
            />
            <div
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border border-blue-600 ${publicgroup.status ? "bg-green-600" : "bg-gray-600"}`}
            ></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium tracking-wide truncate text-copy">
              {publicgroup.name}
            </p>
            <p className="text-xs font-medium tracking-wide truncate text-copylighter">
              {publicgroup.status ? "Someone is online" : "Everyone is offline"}
            </p>
          </div>
          <div
            to="/publicgroup/user1"
            className="inline-flex items-center p-1 rounded-md text-copylight"
          >
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PublicGroup;

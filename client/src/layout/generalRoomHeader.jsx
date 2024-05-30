import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Info } from "@mui/icons-material";

import generalRoom from "../utilities/generalRoom";

const GeneralRoomHeader = () => {
  const [info, setInfo] = useState(false);

  async function showInfo() {
    setInfo((prev) => !prev);
  }

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between max-w-5xl mx-auto border-b-2 border-border backdrop-blur-md">
      <div className="flex items-center space-x-1.5 py-4">
        <Link to="/admin/rooms">
          <ChevronLeft fontSize="medium" className="text-primarylight" />
        </Link>
        <div className="flex items-center space-x-2">
          <img
            className="object-contain w-10 h-10 border-2 border-blue-600 rounded-full"
            src={generalRoom.profilePicture}
            alt={generalRoom.name}
          />
          <h1 className="text-sm font-semibold font-Raleway text-copy">
            {generalRoom.name}
          </h1>
        </div>
      </div>
      <div className="relative inline-block cursor-pointer">
        <button type="button" onClick={showInfo}>
          <Info fontSize="small" className="text-primary" />
        </button>
        {info && (
          <span className="absolute right-0 z-30 block p-2 bg-indigo-600 rounded">
            <p className="text-xs font-medium tracking-wider font-Raleway text-primarycontent">
              All users are members
            </p>
          </span>
        )}
      </div>
    </header>
  );
};

export default GeneralRoomHeader;

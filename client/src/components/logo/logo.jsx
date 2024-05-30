import { Link } from "react-router-dom";
import { Try } from "@mui/icons-material";

import LogoHeading from "../headings/h1/logoHeading";

const Logo = () => {
  return (
    <Link className="flex items-center space-x-1 md:space-x-1.5">
      <LogoHeading />
      <Try className="text-primarylight" fontSize="medium" />
    </Link>
  );
};

export default Logo;

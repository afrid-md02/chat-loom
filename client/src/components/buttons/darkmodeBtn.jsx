import { useDispatch, useSelector } from "react-redux";
import { ChevronRight, DarkMode, LightMode } from "@mui/icons-material";

import themeChanger from "../../utilities/theme_changer";
import { changeThemeHandler } from "../../redux/auth";

const DarkmodeButton = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.auth.darkMode);

  async function toogleDarkMode() {
    try {
      const result = themeChanger(dispatch, darkMode, changeThemeHandler);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <button
      onClick={toogleDarkMode}
      type="button"
      className="flex justify-between w-full px-1 py-2 text-xs font-medium tracking-wider text-copy sm:text-sm"
    >
      <span className="flex items-center space-x-1">
        {!darkMode ? (
          <LightMode fontSize="small" />
        ) : (
          <DarkMode fontSize="small" />
        )}
        <p>Appearence</p>
      </span>
      <span className="flex items-center space-x-2 text-primarylight">
        <p>darkmode : {darkMode ? "on" : "off"}</p>
        <ChevronRight className="text-copy" fontSize="small" />
      </span>
    </button>
  );
};

export default DarkmodeButton;

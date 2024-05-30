import { useSelector, useDispatch } from "react-redux";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";

import themeChanger from "../../utilities/theme_changer";
import { changeThemeHandler } from "../../redux/auth";

const ThemeButton = () => {
  const darkMode = useSelector((state) => state.auth.darkMode);
  const dispatch = useDispatch();

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
      className="p-1 rounded-full hover:bg-themebtnbg"
    >
      {!darkMode ? (
        <LightModeOutlined className="text-primarylight" />
      ) : (
        <DarkModeOutlined className="text-primarylight" />
      )}
    </button>
  );
};

export default ThemeButton;

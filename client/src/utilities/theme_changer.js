export default function themeChanger(dispatch, darkMode, changeThemeHandler) {
  if (!darkMode) {
    localStorage.setItem("darkmode", "on");
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    dispatch(changeThemeHandler({ darkMode: true }));
  } else {
    localStorage.removeItem("darkmode");
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    dispatch(changeThemeHandler({ darkMode: false }));
  }
  return "Theme changed";
}

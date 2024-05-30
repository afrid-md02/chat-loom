import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import MainPageHeader from "../mainPageHeader";
import MainMenu from "../../components/menus/mainMenu";

const MainWrapper = () => {
  return (
    <Fragment>
      <MainPageHeader />
      <Outlet />
      <MainMenu />
    </Fragment>
  );
};

export default MainWrapper;

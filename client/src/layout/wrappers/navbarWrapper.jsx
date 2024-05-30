import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../navbar";
import Footer from "../footer";

const NavbarWrapper = () => {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default NavbarWrapper;

import { NavLink, useLocation } from "react-router-dom";

import navLinksArray from "../../utilities/navlinks_array";

const MainMenu = () => {
  const location = useLocation();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 px-3 bg-foreground sm:px-6">
      <nav className="flex items-center justify-between max-w-6xl px-1 py-2 mx-auto space-x-1 border-t-2 border-border font-Raleway">
        {navLinksArray.map((navlink, index) => {
          if (index === 2) {
            return (
              <NavLink
                key={index}
                title={navlink.name}
                to={navlink.path}
                className={`rounded-full p-2 ${navlink.path === location.pathname ? "bg-blue-600" : "bg-primary"}`}
              >
                {navlink.logo}
              </NavLink>
            );
          } else {
            return (
              <NavLink
                key={index}
                to={navlink.path}
                className={`background_animations flex flex-col items-center space-y-1.5 hover:scale-105 ${navlink.path === location.pathname ? "text-blue-600" : "text-copylight"}`}
              >
                {navlink.logo}
                <p className="text-xs font-semibold">{navlink.name}</p>
              </NavLink>
            );
          }
        })}
      </nav>
    </footer>
  );
};

export default MainMenu;

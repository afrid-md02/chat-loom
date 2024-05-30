import Logo from "../components/logo/logo";
import ThemeButton from "../components/buttons/themeBtn";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 px-3 background_animations backdrop-blur-md sm:px-6">
      <nav className="flex items-center justify-between max-w-5xl py-3 mx-auto border-b-2 border-border md:py-4">
        <Logo />
        <ThemeButton />
      </nav>
    </header>
  );
};

export default Navbar;

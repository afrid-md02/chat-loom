import { useSelector } from "react-redux";

import chat from "../../assets/socialMediaUsers.svg";

const HeroImage = () => {
  const darkMode = useSelector((state) => state.auth.darkMode);

  return (
    <figure className="min-h-auto flex w-full items-center justify-center px-2 py-6 md:min-h-[calc(100dvh-4.25rem)] md:py-8">
      <img
        src={chat}
        alt="chat"
        className={`background_animations h-auto w-full md:h-96 ${darkMode ? "drop-shadow-3xlDarkMode" : "drop-shadow-3xlLightMode"}`}
      />
    </figure>
  );
};

export default HeroImage;

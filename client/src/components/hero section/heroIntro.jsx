import ChatLoomHeading from "../headings/h2/chatLoomHeading";
import ChatloomAboutText from "../paragraphs/chatLoomAboutTxt";
import GetstartedButton from "../buttons/getStartedBtn";
import LandingLoginButton from "../buttons/landingLoginBtn";

const HeroIntro = () => {
  return (
    <article className="flex min-h-[calc(100dvh-3.75rem)] w-full flex-col justify-center space-y-6 px-2 py-6 md:min-h-[calc(100dvh-4.25rem)] md:py-8">
      <ChatLoomHeading />
      <ChatloomAboutText />
      <div className="flex flex-col items-center justify-center w-full space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0 md:text-base">
        <GetstartedButton />
        <LandingLoginButton />
      </div>
    </article>
  );
};

export default HeroIntro;

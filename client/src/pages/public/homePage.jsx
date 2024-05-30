import HeroSection from "../../components/hero section/heroSection";
import WhyChatLoom from "../../components/why chatloom/whyChatLoom";
import LandingSignin from "../../components/landing signin/landingSignin";

const HomePage = () => {
  return (
    <main className="background_animations">
      <HeroSection />
      <WhyChatLoom />
      <LandingSignin />
    </main>
  );
};

export default HomePage;

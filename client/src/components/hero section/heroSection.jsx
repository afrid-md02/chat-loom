import HeroIntro from "./heroIntro";
import HeroImage from "./heroImage";

const HeroSection = () => {
  return (
    <section className="px-3 background_animations sm:px-6">
      <div className="flex flex-col max-w-5xl mx-auto font-Raleway lg:flex-row">
        <HeroIntro />
        <HeroImage />
      </div>
    </section>
  );
};

export default HeroSection;

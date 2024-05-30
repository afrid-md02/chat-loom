import WhyChatLoomHeading from "../headings/h3/whyChatLoomHeading";
import SpecsContainer from "../specifications container/specsContainer";

const WhyChatLoom = () => {
  return (
    <section className="px-3 background_animations bg-foreground sm:px-6">
      <div className="max-w-5xl py-6 mx-auto space-y-6 font-Raleway md:py-8">
        <WhyChatLoomHeading />
        <SpecsContainer />
      </div>
    </section>
  );
};

export default WhyChatLoom;

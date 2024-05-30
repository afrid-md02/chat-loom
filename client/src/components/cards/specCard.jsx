import SpecNameHeading from "../headings/h4/specNameHeading";
import SpecText from "../paragraphs/specTxt";

const SpecCard = ({ item }) => {
  return (
    <figure className="p-6 space-y-3 shadow-sm rounded-xl bg-background md:shadow-md">
      <span className="flex justify-center w-full">{item.logo}</span>
      <SpecNameHeading>{item.name}</SpecNameHeading>
      <SpecText>{item.description}</SpecText>
    </figure>
  );
};

export default SpecCard;

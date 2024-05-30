import specsArray from "../../utilities/specs_array";

import SpecCard from "../cards/specCard";

const SpecsContainer = () => {
  return (
    <div className="grid grid-cols-1 gap-4 background_animations sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-4 lg:gap-6">
      {specsArray.map((item, index) => {
        return <SpecCard key={index} item={item} />;
      })}
    </div>
  );
};

export default SpecsContainer;

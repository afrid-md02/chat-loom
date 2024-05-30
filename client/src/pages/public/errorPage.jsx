import { useNavigate } from "react-router-dom";

import ErrorHeading from "../../components/headings/h1/errorHeading";
import OopsNotFoundText from "../../components/paragraphs/oopsNotFoundTxt";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <main className="flex items-center justify-center h-screen px-3 py-4 background_animations sm:px-6">
      <section className="w-full p-2 space-y-6 font-Raleway">
        <div>
          <ErrorHeading />
          <OopsNotFoundText />
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-xs font-semibold rounded background_animations bg-primary text-primarycontent hover:scale-105 hover:bg-primarydark sm:text-sm md:text-base"
          >
            Go back
          </button>
        </div>
      </section>
    </main>
  );
};

export default ErrorPage;

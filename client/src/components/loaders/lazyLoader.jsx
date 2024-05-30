import Thinking from "../../assets/thinking.svg";

const LazyLoader = () => {
  return (
    <figure className="flex justify-center h-screen px-4 align-middle sm:px-8">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-32 h-32 border-t-4 border-b-4 rounded-full animate-spin border-copylighter"></div>
        <img src={Thinking} className="rounded-full h-28 w-28" />
      </div>
    </figure>
  );
};

export default LazyLoader;

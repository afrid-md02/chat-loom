import { NotInterested } from "@mui/icons-material";

const ErrorHeading = () => {
  const size = window.innerWidth >= 768;

  return (
    <h1 className="flex items-center justify-center space-x-1 px-1 font-VT323 text-5xl text-copy sm:text-8xl md:text-[8rem]">
      <span>4</span>
      <NotInterested
        className="text-red-600"
        sx={{ fontSize: size ? 70 : 35 }}
      />
      <span>4</span>
    </h1>
  );
};

export default ErrorHeading;

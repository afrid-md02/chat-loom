import { RotateRight } from "@mui/icons-material";

const LoadingButton = () => {
  const wSize = window.innerWidth >= 768;

  return (
    <div className="flex justify-center">
      <button
        type="button"
        disabled
        className="flex items-center justify-center w-full px-2 py-2 text-xs font-semibold tracking-wider text-center rounded-lg background_animations bg-primarydark text-primarycontent hover:scale-105 hover:bg-primarydark sm:py-3 sm:text-sm"
      >
        <RotateRight
          className="animate-spin"
          sx={{ fontSize: wSize ? 22.5 : 17.5 }}
        />
      </button>
    </div>
  );
};

export default LoadingButton;

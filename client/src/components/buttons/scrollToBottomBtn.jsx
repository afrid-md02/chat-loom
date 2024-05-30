import { ExpandCircleDown } from "@mui/icons-material";

const ScrollToBottomButton = () => {
  async function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }
  return (
    <button
      onClick={scrollToBottom}
      type="button"
      className="sticky z-20 flex items-center p-1 space-x-1 duration-500 rounded shadow-lg bottom-24 bg-gradient-to-r from-red-600 to-orange-600 text-primarycontent hover:scale-110 md:bottom-28"
    >
      <ExpandCircleDown fontSize="medium" />
    </button>
  );
};

export default ScrollToBottomButton;

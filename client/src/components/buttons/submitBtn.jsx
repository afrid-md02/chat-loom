const SubmitButton = ({ children }) => {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        className="flex justify-center w-full px-2 py-2 text-xs font-semibold tracking-wider text-center rounded-lg background_animations bg-primary text-primarycontent active:scale-105 active:bg-primarydark sm:py-3 sm:text-sm md:hover:scale-105 md:hover:bg-primarydark"
      >
        {children}
      </button>
    </div>
  );
};

export default SubmitButton;

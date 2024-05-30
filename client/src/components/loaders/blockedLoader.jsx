const BlockedLoader = ({ children }) => {
  return (
    <p className="w-full px-3 py-6 text-sm font-medium tracking-wider text-center text-red-600 animate-pulse font-Raleway sm:px-6">
      {children}
    </p>
  );
};

export default BlockedLoader;

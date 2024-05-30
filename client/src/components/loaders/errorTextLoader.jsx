const ErrorTextLoader = ({ children }) => {
  return (
    <p className="w-full px-3 py-6 text-xs font-medium tracking-wider text-center text-red-600 animate-pulse font-Raleway sm:px-6 sm:text-sm">
      {children}
    </p>
  );
};

export default ErrorTextLoader;

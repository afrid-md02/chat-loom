const MainCard = ({ children }) => {
  return (
    <ul className="w-full max-w-5xl p-3 mx-auto text-sm divide-y-2 rounded-lg shadow-sm background_animations divide-border bg-foreground">
      {children}
    </ul>
  );
};

export default MainCard;

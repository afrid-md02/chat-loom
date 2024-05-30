const List = ({ children }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 px-2 py-4 border-2 rounded border-border">
      {children}
    </div>
  );
};

export default List;

const List = ({ children }) => {
  return (
    <ul role="list" className="divide-y-2 divide-border">
      {children}
    </ul>
  );
};

export default List;

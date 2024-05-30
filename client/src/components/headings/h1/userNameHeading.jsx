const UserNameHeading = ({ userName }) => {
  return (
    <h1 className="text-sm font-semibold text-copy">{userName || "unknown"}</h1>
  );
};

export default UserNameHeading;

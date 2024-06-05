import { Link } from "react-router-dom";

const ListItem = ({ user }) => {
  return (
    <Link to={`/admin/profile/${user._id}`}>
      <figure className="flex flex-col items-center px-4 py-2 space-y-2 rounded background_animations hover:scale-105 hover:bg-foreground hover:shadow-md">
        <img
          src={user.profilePicture}
          alt={user.userName}
          className="object-contain w-20 h-20 rounded-full md:h-24 md:w-24"
        />
        <figcaption
          className={`rounded bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-1 text-center font-Raleway text-xs font-medium tracking-wider text-primarycontent sm:text-sm`}
        >
          {user.userName}
        </figcaption>
      </figure>
    </Link>
  );
};

export default ListItem;

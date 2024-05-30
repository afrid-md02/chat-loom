import {
  ChatBubble,
  Groups,
  Add,
  AccountCircle,
  Settings,
} from "@mui/icons-material";

const navLinksArray = [
  {
    name: "Chats",
    path: "/admin",
    logo: <ChatBubble fontSize="medium" />,
  },
  {
    name: "Rooms",
    path: "/admin/rooms",
    logo: <Groups fontSize="medium" />,
  },
  {
    name: "Add friends",
    path: "/admin/add-friends",
    logo: <Add fontSize="medium" className="text-primarycontent" />,
  },
  {
    name: "Profile",
    path: "/admin/profile",
    logo: <AccountCircle fontSize="medium" />,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    logo: <Settings fontSize="medium" />,
  },
];

export default navLinksArray;

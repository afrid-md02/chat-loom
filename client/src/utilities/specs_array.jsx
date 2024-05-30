import {
  VpnKeyOutlined,
  RepeatOutlined,
  ForumOutlined,
  WifiOutlined,
  // SmartToyOutlined,
  AddPhotoAlternateOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

const specsArray = [
  {
    name: "Privacy",
    description:
      "Your data & chats are safe, private and secure with end-to-end encryption",
    logo: <VpnKeyOutlined className="text-primary" fontSize="large" />,
  },
  {
    name: "1:1 Chat",
    description:
      "Instant messaging is the easiest way to communicate with your friends",
    logo: <RepeatOutlined className="text-primary" fontSize="large" />,
  },
  {
    name: "Room Chats",
    description:
      "Start new chat rooms effortlessly. Whether it's private, or public, create and customize your own rooms",
    logo: <ForumOutlined className="text-primary" fontSize="large" />,
  },
  {
    name: "Online User Indicator",
    description:
      "See who's online and who's offline in real-time. Easily identify when users are available for chat and stay connected",
    logo: <WifiOutlined className="text-primary" fontSize="large" />,
  },
  // {
  //   name: "Chat With AI",
  //   description:
  //     "Meet our AI Chatbot, your intelligent companion in every conversation",
  //   logo: <SmartToyOutlined className="text-primary" fontSize="large" />,
  // },
  {
    name: "Media Sharing",
    description:
      "Share memorable moments with room members. Exchange images, videos, and texts within chat rooms, making conversations vibrant and engaging",
    logo: (
      <AddPhotoAlternateOutlined className="text-primary" fontSize="large" />
    ),
  },
  {
    name: "Room Management",
    description:
      "Take control of your chat rooms. Add or remove members, update room details, and ensure a seamless chat experience tailored to your needs",
    logo: <SettingsOutlined className="text-primary" fontSize="large" />,
  },
];

export default specsArray;

import { useEffect } from "react";
import { useSelector } from "react-redux";

import { calculateTime } from "../../../utilities/calculator";

import FullScreenImage from "../../full screen image/fullScreenImage";

const ListItem = ({ messages }) => {
  const userId = useSelector((state) => state.auth.user.userId);
  const darkMode = useSelector((state) => state.auth.darkMode);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {messages.map((message) => {
        const time = calculateTime(message.createdAt);
        return (
          <li
            key={message._id}
            className={`flex items-center space-x-2 ${message.senderId === userId ? "justify-end" : "justify-start"}`}
          >
            {message.senderId !== userId && (
              <img
                src={message.senderProfilePicture}
                alt={message.senderProfilePicuter}
                className="w-10 h-10 border-2 rounded-full object-fit border-primarylight sm:h-12 sm:w-12"
              />
            )}
            <div
              className={`w-3/4 space-y-1 rounded-lg px-2 py-1.5 sm:w-1/2 md:w-1/3 md:space-y-2 ${message.senderId === userId ? "rounded-br-none bg-gradient-to-r from-indigo-600 to-blue-600" : "rounded-bl-none bg-foreground"}`}
            >
              {message.senderId !== userId && (
                <p
                  className={`py-1 text-start font-BrunoAceSC text-xs font-semibold tracking-widest md:text-sm ${message.senderId === userId ? "text-gray-400" : "text-copylighter"}`}
                >
                  {message.senderName}
                </p>
              )}
              {!!message.media[0] &&
                (message.media[0].mediaType === "image" ? (
                  <FullScreenImage
                    src={message.media[0].mediaUrl}
                    alt={message.media[0].mediaType}
                  />
                ) : (
                  <video
                    className="w-full h-auto rounded cursor-pointer"
                    controls
                  >
                    <source src={message.media[0].mediaUrl} />
                    Your browser does not support the video tag.
                  </video>
                ))}
              <p
                className={`border-b py-1 text-start font-Raleway text-xs font-medium tracking-wide md:text-sm ${message.senderId === userId ? "text-primarycontent" : "text-copy"} ${darkMode && message.senderId !== userId ? "border-gray-600" : "border-gray-400"}`}
              >
                {message.text}
              </p>
              <p
                className={`py-1 text-end font-serif text-xs font-medium ${message.senderId === userId ? "text-primarycontent" : "text-copylight"}`}
              >
                {time}
              </p>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default ListItem;

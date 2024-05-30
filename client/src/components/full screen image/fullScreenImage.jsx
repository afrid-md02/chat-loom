import { useState } from "react";

const FullScreenImage = ({ src, alt }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  function toggleFullScreen() {
    setIsFullScreen(!isFullScreen);
  }

  return (
    <>
      {!isFullScreen ? (
        <img
          src={src}
          alt={alt}
          onClick={toggleFullScreen}
          className="w-full h-auto rounded cursor-pointer"
        />
      ) : (
        <div
          className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-90"
          onClick={toggleFullScreen}
        >
          <img src={src} alt={alt} className="object-contain w-auto h-3/4" />
        </div>
      )}
    </>
  );
};

export default FullScreenImage;

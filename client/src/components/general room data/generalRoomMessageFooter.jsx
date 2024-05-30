import { useRef, useState } from "react";

import FilePreviewer from "../file preview/filePreviewer";
import GeneralRoomForm from "../forms/generalRoomForm";

const GeneralRoomMessageFooter = () => {
  const [filePreview, setFilePreview] = useState("");
  const fileInputRef = useRef(null);

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 px-3 pt-2 pb-4 space-y-2 font-medium tracking-wide border-t-2 border-border bg-foreground font-Raleway sm:px-6 sm:pb-6 sm:pt-3">
      <FilePreviewer
        filePreview={filePreview}
        fileInputRef={fileInputRef}
        setFilePreview={setFilePreview}
      />
      <GeneralRoomForm
        setFilePreview={setFilePreview}
        fileInputRef={fileInputRef}
      />
    </footer>
  );
};

export default GeneralRoomMessageFooter;

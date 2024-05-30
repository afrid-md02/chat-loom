import { Close } from "@mui/icons-material";

const FilePreviewer = ({ filePreview, fileInputRef, setFilePreview }) => {
  async function handleClearFile() {
    setFilePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  }

  return (
    <>
      {filePreview && (
        <figure className="flex flex-col items-center bg-inherit">
          <button
            className="flex items-center space-x-1 rounded bg-custompink px-1 py-0.5"
            type="button"
            onClick={handleClearFile}
          >
            <Close className="text-primarycontent" fontSize="small" />
            <p className="hidden text-xs font-medium tracking-wider text-primarycontent sm:block md:text-sm">
              Remove
            </p>
          </button>

          {filePreview.startsWith("data:image/") ? (
            <img
              src={filePreview}
              alt="File Preview"
              className="object-contain border-2 rounded max-h-36 border-primary sm:max-h-40 md:max-h-44"
            />
          ) : filePreview.startsWith("data:video/") ? (
            <video
              className="object-contain border-2 rounded max-h-36 border-primary sm:max-h-40 md:max-h-44"
              controls
            >
              <source src={filePreview} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p className="py-2 text-xs text-center text-copy md:text-sm">
              Unsupported file type
            </p>
          )}
        </figure>
      )}
    </>
  );
};

export default FilePreviewer;

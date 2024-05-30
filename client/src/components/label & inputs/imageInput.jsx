import { useId } from "react";
import { toast } from "sonner";

const ImageInput = () => {
  const uId = useId();

  async function handleImageChange(event) {
    const selectedImage = event.target.files[0];
    if (!selectedImage && !selectedImage.type.startsWith("image/")) {
      // Handle invalid file type (non-image)
      toast.error("Please select a valid image file.", {
        position: "top-right",
      });
    }
  }

  return (
    <div className="space-y-2">
      <label
        className="text-xs text-primarylight sm:text-sm"
        htmlFor={`${uId}-profilePicture`}
      >
        Choose profile picture
      </label>
      <input
        id={`${uId}-profilePicture`}
        className="text-xs text-copy sm:text-sm"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        name="profilePicture"
        required
      />
    </div>
  );
};

export default ImageInput;

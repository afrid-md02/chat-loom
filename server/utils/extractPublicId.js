const extractPublicId = (url) => {
  const regex = /\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-z0-9]+)?$/i;
  const matches = url.match(regex);
  if (matches && matches[1]) {
    const extensionArray = matches[1].split(".");
    const extension = extensionArray[extensionArray.length - 1];
    return { publicId: matches[1], extension };
  }
  return null;
};

export default extractPublicId;

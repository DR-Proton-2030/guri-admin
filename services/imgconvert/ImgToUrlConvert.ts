export const convertImageToUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
  const reader = new FileReader();
  if (e.target.files![0]) {
    reader.readAsDataURL(e.target.files![0]);
  }
  reader.onload = async (readerEvent: ProgressEvent<FileReader>) => {
    const url = readerEvent.target?.result;
    return url?.toString();
  };
};

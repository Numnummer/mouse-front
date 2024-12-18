import { getFilesContent } from "./GetFilesContent.js";

export function onFileChange(event, setSelectedFiles, setFileContents) {
  const files = event.target.files;
  setSelectedFiles(files);
  getFilesContent(files, setFileContents);
}

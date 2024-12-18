export function getFilesContent(files, setFileContents) {
  const promises = Array.from(files).map((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Resolve with both file name and byte content
        resolve({ fileName: file.name, content: reader.result });
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file); // Read the file as byte array
    });
  });

  // Set file contents once all files are read
  Promise.all(promises)
    .then((fileData) => {
      setFileContents(fileData);
    })
    .catch((error) => {
      console.error("Error reading files", error);
    });
}

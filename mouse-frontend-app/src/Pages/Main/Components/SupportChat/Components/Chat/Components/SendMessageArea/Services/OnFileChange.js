import { getFilesContent } from "./GetFilesContent.js";

export function onFileChange(
  event,
  setSelectedFiles,
  setFileContents,
  setSelectedFilesMetadata,
) {
  const files = event.target.files;
  setSelectedFiles(files);
  getFilesContent(files, setFileContents);

  const metadataPromises = files.map(async (file) => {
    let metadata = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    };

    // Determine file type and extract metadata
    /*if (file.type.startsWith('audio/')) {
      const arrayBuffer = await file.arrayBuffer();
      const audioData = audioMetadata.parseBuffer(arrayBuffer, file.type);
      metadata = { ...metadata, audio: audioData };
    } else if (file.type.startsWith('image/')) {
      const arrayBuffer = await file.arrayBuffer();
      const dimensions = imageSize(arrayBuffer);
      metadata = { ...metadata, width: dimensions.width, height: dimensions.height };
    } else if (file.type.startsWith('video/')) {
      // For video, you can use a library or custom logic to get metadata, like duration etc.
      // Here, we're assuming we will just save the type.
      metadata = { ...metadata, video: "Video metadata can be extracted here" };
    }*/
    // You could also handle specific text files, icons, etc.

    return metadata;
  });

  Promise.all(metadataPromises).then((metadataArray) => {
    // Transform the metadata array to include the file name in each JSON string
    const jsonMetadataArray = metadataArray.map((metadata) => {
      return JSON.stringify(metadata); // Combine file name with metadata
    });

    // Set the state with the array of JSON strings
    setSelectedFilesMetadata(jsonMetadataArray);
    console.log(jsonMetadataArray); // For debugging
  });
}

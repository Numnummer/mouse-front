export function uint8ArrayToBase64(uint8Array) {
  let binary = "";
  const chunkSize = 8192; // Process in chunks of 8KB
  for (let i = 0; i < uint8Array.length; i += chunkSize) {
    const chunk = uint8Array.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, chunk);
  }
  return btoa(binary);
}

export const uint8ArrayToBase64 = (uint8Array) => {
    let binary = '';
    const bytes = [].slice.call(uint8Array);
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
}
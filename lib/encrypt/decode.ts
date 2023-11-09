import CryptoJS from "crypto-js";

export function decodeData(encodedData: string): string {
  const decodedData = CryptoJS.enc.Utf8.stringify(
    CryptoJS.enc.Base64.parse(encodedData)
  );
  return decodedData;
}

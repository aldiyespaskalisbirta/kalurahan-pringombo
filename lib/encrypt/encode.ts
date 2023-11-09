import * as CryptoJS from "crypto-js";

export function encodeData(data: string): string {
  const encodedData = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(data)
  );
  return encodedData;
}
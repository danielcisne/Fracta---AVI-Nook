export interface Product {
  id: number;
  name: string;
  imageBase64: string; // Contains the full data URL (e.g., "data:image/png;base64,...")
}

export interface UserImage {
  data: string; // base64 data without prefix
  mimeType: string;
  dataUrl: string; // base64 data with prefix for <img> src
}

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
}

export interface UserImage {
  data: string; // base64 data without prefix
  mimeType: string;
  dataUrl: string; // base64 data with prefix for <img> src
}
export interface Video {
  _id: string;
  title: string;
  description: string;
  PublicId: string;

  originalSize: number;
  compressedSize: number;

  compressedUrl: string;

  duration: number;
  createdAt: Date;
  updatedAt: Date;
}
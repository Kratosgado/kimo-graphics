export type Category = {
  id?: string;
  name: string;
  description: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ImageData = {
  id?: string;
  base64: string;
  originalName: string;
  size: 'small' | 'medium' | 'large';
  mimeType: string;
  status: 'new' | 'deleted' | 'exists';
}

export type Project = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  categoryId: string;
  client: string;
  year: number;
  featured: boolean;
  description: string;
  challenge?: string;
  solution?: string;
  images: ImageData[];
  createdAt?: Date;
  updatedAt?: Date;
}

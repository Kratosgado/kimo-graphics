import type { ImageData } from '$lib/types';

// Convert file to base64
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

// Compress image before converting to base64
export async function compressAndConvertToBase64(file: File, maxWidth = 1200, quality = 0.7): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions while maintaining aspect ratio
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        blob => {
          if (!blob) {
            reject(new Error('Canvas to Blob conversion failed'));
            return;
          }

          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
        },
        file.type,
        quality
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error('Image loading error'));
    };
  });
}

// Determine image size category based on aspect ratio or other criteria
export function determineImageSize(file: File, index: number): 'small' | 'medium' | 'large' {
  // This is a simple implementation - you might want to use more sophisticated logic
  // For example, analyzing the image dimensions after loading
  if (index % 5 === 0) return 'large';
  if (index % 3 === 0) return 'medium';
  return 'small';
}

// Process multiple files into ImageData objects
export async function processImageFiles(files: FileList): Promise<ImageData[]> {
  const imagePromises = Array.from(files).map(async (file, index) => {
    try {
      const base64 = await compressAndConvertToBase64(file);
      return {
        base64,
        originalName: file.name,
        size: determineImageSize(file, index),
        mimeType: file.type
      };
    } catch (error) {
      console.error(`Error processing image ${file.name}:`, error);
      throw error;
    }
  });

  return Promise.all(imagePromises);
}

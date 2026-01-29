import { cloudinary } from "@/cloudinary";

interface ImageType {
  url: string;
  filename: string;
  size: number;
}

/**
 * Processes uploaded images to Cloudinary
 * @param files Array of File objects from FormData
 */
export const processEventImages = async (
  files: File[],
): Promise<ImageType[]> => {
  const uploadPromises = files.map(async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise<ImageType>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "DevEvent",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error("Upload failed"));

          resolve({
            url: result.secure_url,
            filename: result.public_id,
            size: result.bytes,
          });
        },
      );

      uploadStream.end(buffer);
    });
  });

  return Promise.all(uploadPromises);
};

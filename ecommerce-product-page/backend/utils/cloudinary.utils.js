import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { configDotenv } from "dotenv";
configDotenv();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

const uploadOnCloud = async (localfilepath) => {
  try {
    if (!localfilepath) {
      return null;  // Ensure that we have a valid file path
    }

    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "image",
    });

    console.log("File uploaded to Cloudinary: ", response.url);

    // Remove the locally saved temp file after upload
    fs.unlinkSync(localfilepath);
    console.log("Local file deleted: ", localfilepath);

    return response;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    // Ensure to remove the local file in case of an error
    fs.unlinkSync(localfilepath);
    return null;
  }
};

export { uploadOnCloud };

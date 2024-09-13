import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { configDotenv } from "dotenv";
configDotenv();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET, // Click 'View API Keys' above to copy your API secret -> will put it in .env file for now
});

const uploadOnCloud = async (localfilepath) => {
  try {
    if (localfilepath) {
      return null;
    }

    // upload files on cloudinary
    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "image",
    });
    // file has been uploaded successfully
    console.log("File uploaded on cloudinary : ", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localfilepath); //remove the locally saved temp file
    return null;
  }
};

export {uploadOnCloud};

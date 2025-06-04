// filepath: d:\pavanassesment\backend\config\cloudinary.js
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.error("[Cloudinary Upload] No file path provided");
      return null;
    }

    // Check if file exists and is accessible
    try {
      await fs.promises.access(localFilePath, fs.constants.R_OK);
    } catch (error) {
      console.error(`[Cloudinary Upload] File access error: ${error.message}`);
      return null;
    }

    // Upload to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "product-hunt", // Organize uploads in a folder
    });

    console.log(`[Cloudinary Upload] Success: ${response.secure_url}`);
    return response;
  } catch (error) {
    console.error("[Cloudinary Upload Error]", error);
    return null;
  } finally {
    // Clean up local file in finally block to ensure it runs even if there's an error
    try {
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
        console.log(
          `[Cloudinary Upload] Local file cleaned up: ${localFilePath}`
        );
      }
    } catch (cleanupError) {
      console.warn(
        `[Cloudinary Upload] Failed to clean up local file: ${cleanupError.message}`
      );
    }
  }
};

module.exports = { cloudinary, uploadOnCloudinary };

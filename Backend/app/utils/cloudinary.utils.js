// 1. Import the RAW, unconfigured cloudinary SDK directly from node_modules
const cloudinary = require('cloudinary').v2;

const uploadToCloudinary = (buffer, folder) => {
    // 2. FORCE the configuration right here, right now, using the live env values
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    // 3. Optional debug log to verify everything is present at execution time
    console.log("--- Executing Cloudinary Upload ---");
    console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("API Key Exists:", !!process.env.CLOUDINARY_API_KEY);

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'auto'
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary Stream Error:", error);
                    return reject(error);
                }
                resolve(result);
            }
        );

        stream.end(buffer);
    });
};

module.exports = uploadToCloudinary;
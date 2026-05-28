const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = (buffer, folder) => {

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


const deleteFromCloudinary = (publicId) => {
    return new Promise((resolve, reject) => {
        const deleteResourceSatus = cloudinary.uploader.destroy(publicId, { resource_type: 'image', type: 'upload' },
            (error, result) => {
                if (error) {
                    console.log("Error in deleting from cloudinary is ", error);
                    return reject(error)
                }
                resolve(result)

            }
        )
    })
}


module.exports = { uploadToCloudinary, deleteFromCloudinary };
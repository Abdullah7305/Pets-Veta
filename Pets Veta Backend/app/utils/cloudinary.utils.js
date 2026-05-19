const cloudinary = require('../config/cloudinary.config');

const uploadToCloudinary = (buffer, folder) => {
    console.log(process.env.CLOUDINARY_API_KEY);
    
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'auto'
            },
            (error, result) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                }
                resolve(result)
            }
        );

        stream.end(buffer);
    })
}

module.exports = uploadToCloudinary;
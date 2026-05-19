const app = require('./app/app');
const dotenv = require('dotenv');

// Load environment variables FIRST
dotenv.config();

// Configure Cloudinary after dotenv is loaded
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log("Server is running");
})

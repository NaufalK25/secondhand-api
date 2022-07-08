require('dotenv').config();
const { v2 } = require('cloudinary');

const uploadImage = async (folder, path, publicId) => {
    const image = await v2.uploader.upload(path, {
        public_id: publicId,
        resource_type: 'auto',
        overwrite: true,
        invalidate: true,
        folder:
            process.env.NODE_ENV === '' ||
            process.env.NODE_ENV === 'development'
                ? `development/${folder}`
                : folder
    });
    return image;
};

module.exports = { uploadImage };

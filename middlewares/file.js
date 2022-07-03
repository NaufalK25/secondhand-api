const path = require('path');
const multer = require('multer');
const { v4 } = require('uuid');

const createStorage = (uploadField = '') => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.mimetype.startsWith('image/')) {
                cb(null, `uploads/${uploadField}`);
            } else {
                cb(new Error('File yang diupload harus berupa gambar'), null);
            }
        },
        filename: (req, file, cb) => {
            if (file.mimetype.startsWith('image/')) {
                cb(
                    null,
                    `${v4().replace(/-/g, '')}${path.extname(
                        file.originalname
                    )}`
                );
            } else {
                cb(new Error('File yang diupload harus berupa gambar'), null);
            }
        }
    });
};

const profileStorage = createStorage('profiles');
const productStorage = createStorage('products');

module.exports = {
    createStorage,
    profileStorage,
    productStorage
};

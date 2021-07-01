import multer from 'multer';

class UploaderManager {
    constructor(filePath) {
        this.assetsPath = filePath;
        this.storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, filePath);
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length-1]);
            }
        });
    }
}
/**
 * @member {multer.diskStorage} storage
 */
module.exports = UploaderManager;
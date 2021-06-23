import UploaderManager from './UploaderManager';

class ImageUploader extends UploaderManager {
    constructor(filepath) {
        super(filepath);
    }
    filter(req, file, cb) {
        cb(null, true);
    }
}

module.exports = ImageUploader;
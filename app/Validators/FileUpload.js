'use strict';

class FileUpload {
    get rules () {
        return {
            image: 'required|file|file_types:image|file_ext:jpeg|file_size:2mb',
        };
    }

    get messages () {
        return {
            image: 'Your custom text message',
        };
    }

    async fails (errorMessages) {
        return this.ctx.response
            .status(403)
            .send({
                message: 'Error during file upload', errors: errorMessages,
            });
    }
}

module.exports = FileUpload;

'use strict';

class FileUpload {
    get rules () {
        return {
            'custom-param-name': 'required|file|file_types:image|file_ext:jpeg|file_size:1mb',
        };
    }

    get messages () {
        return {
            'custom-param-name.required': 'Your custom text message',
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

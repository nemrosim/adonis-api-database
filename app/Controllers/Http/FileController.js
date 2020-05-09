'use strict';

const Helpers = use('Helpers');
const Drive = use('Drive');

class FileController {
    async upload ({ request }) {
        const imageFile = request.file('image');

        await imageFile.move(Helpers.tmpPath('uploads'), {
            name: 'image.jpg',
            overwrite: false,
        });

        if (!imageFile.moved()) {
            return imageFile.error();
        }
        return 'File uploaded';
    }

    async uploadVideo ({ request }) {
        const video = request.file('video');

        await video.move(Helpers.tmpPath('uploads'), {
            name: 'video.mp4',
            overwrite: false,
        });

        if (!video.moved()) {
            return video.error();
        }
        return 'Video file uploaded';
    }

    async downloadVideo ({ params, response }) {
        const filePath = `uploads/${params.fileName}`;
        const isExist = await Drive.exists(filePath);

        if (isExist) {
            return response.download(Helpers.tmpPath(filePath));
        }
        return 'File does not exist';
    }

    async download ({ params, response }) {
        const filePath = `uploads/${params.fileName}`;
        const isExist = await Drive.exists(filePath);

        if (isExist) {
            return response.download(Helpers.tmpPath(filePath));
        }
        return 'File does not exist';
    }
}


module.exports = FileController;

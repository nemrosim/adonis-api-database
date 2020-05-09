'use strict';

const Helpers = use('Helpers');
const Drive = use('Drive');

class FileController {
    async upload ({ request }) {
        const imageFile = request.file('custom-param-name');

        await imageFile.move(Helpers.tmpPath('uploads'), {
            name: 'custom-name.jpg',
            overwrite: false,
        });

        if (!imageFile.moved()) {
            return imageFile.error();
        }
        return 'File uploaded';
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

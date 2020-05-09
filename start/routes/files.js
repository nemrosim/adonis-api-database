'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route
    .group(() => {
        Route
            .post('upload', 'FileController.upload')
            .validator(['FileUpload']);

        Route
            .get('download/:fileName', 'FileController.download');
    })
    .prefix('api/v1/');

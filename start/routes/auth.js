'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const { ROUTES, CONTROLLERS } = require('../../constants');


Route
    .group(() => {
        Route
            .post(ROUTES.LOGIN, `${CONTROLLERS.AUTH}.login`)
            .middleware(['guest'])
            .formats(['json']);

        Route
            .post(ROUTES.REGISTER, `${CONTROLLERS.AUTH}.register`)
            .middleware(['guest'])
            .validator('RegisterUser')
            .formats(['json']);
    })
    .prefix('api/v1/');

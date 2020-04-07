'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route
    .group(() => {
        Route
            .post('login', 'AuthController.login')
            .middleware(['guest'])
            .formats(['json']);

        Route
            .post('register', 'AuthController.register')
            .middleware(['guest'])
            .validator('RegisterUser')
            .formats(['json']);
    })
    .prefix('api/v1/');

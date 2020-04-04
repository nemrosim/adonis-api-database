'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route
    .group(() => {
        Route
            .post('register', 'AuthController.register')
            .middleware(['guest'])
            .validator(new Map([
                [['users.store'], ['RegisterUser']],
            ]))
            .formats(['json']);

        Route
            .resource('users', 'UserController')
            .apiOnly();
    })
    .prefix('api/v1/');

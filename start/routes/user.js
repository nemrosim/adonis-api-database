'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const { ROUTES, CONTROLLERS, VALIDATORS } = require('../../constants');

Route
    .group(() => {
        Route
            .get(`${ROUTES.USERS}/current`, 'UserController.current')
            .middleware('auth')
            .formats(['json']);

        Route
            .resource(ROUTES.USERS, CONTROLLERS.USER_CONTROLLER)
            .middleware('auth')
            .validator(new Map([
                [['users.store'], [VALIDATORS.STORE_USER]],
                [['users.update'], [VALIDATORS.STORE_USER]],
            ]))
            .apiOnly();
    })
    .prefix('api/v1/');

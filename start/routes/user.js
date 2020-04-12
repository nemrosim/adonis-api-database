'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const { ROUTES, CONTROLLERS, VALIDATORS } = require('../../constants');

Route
    .group(() => {
        Route
            .get(`${ROUTES.USERS}/current`, `${CONTROLLERS.USER_CONTROLLER}.current`)
            .middleware(['auth'])
            .middleware(['role.user'])
            .formats(['json']);

        Route
            .patch(`${ROUTES.USERS}/changePassword`, `${CONTROLLERS.USER_CONTROLLER}.changePassword`)
            .middleware(['auth'])
            .middleware(['role:user'])
            .validator([VALIDATORS.CHANGE_PASSWORD_USER])
            .formats(['json']);

        Route
            .patch(`${ROUTES.USERS}/changeEmail`, `${CONTROLLERS.USER_CONTROLLER}.changeEmail`)
            .middleware(['auth'])
            .middleware(['role:user'])
            .validator([VALIDATORS.CHANGE_EMAIL_USER])
            .formats(['json']);

        Route
            .resource(ROUTES.USERS, CONTROLLERS.USER_CONTROLLER)
            .middleware(['auth'])
            .middleware(new Map([
                [['users.index'], ['role:admin']],
                [['users.store'], ['role:admin']],
            ]))
            .validator(new Map([
                [['users.store'], [VALIDATORS.STORE_USER]],
                [['users.show'], [VALIDATORS.SHOWS_USER]],
            ]))
            .apiOnly();
    })
    .prefix('api/v1/');

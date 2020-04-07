'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const ROUTES = require('../../constants/routes')

Route
    .group(() => {
        Route
            .get(`${ROUTES.USERS}/current`, 'UserController.current')
            .middleware('auth')
            .formats(['json']);

        Route
            .resource('users', 'UserController')
            .middleware('auth')
            .validator(new Map([
                [['users.store'], ['StoreUser']],
                [['users.update'], ['StoreUser']],
            ]))
            .apiOnly();
    })
    .prefix('api/v1/');

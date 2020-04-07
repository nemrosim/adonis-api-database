'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const { ROUTES, CONTROLLERS, VALIDATORS } = require('../../constants/routes');

Route
    .group(() => {
        Route
            .resource(ROUTES.PROFILES, CONTROLLERS.PROFILE_CONTROLLER)
            .middleware('auth')
            .validator(new Map([
                [['profiles.store'], [VALIDATORS.STORE_USER]],
            ]))
            .apiOnly();
    })
    .prefix('api/v1/');

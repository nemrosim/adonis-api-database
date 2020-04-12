'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const { ROUTES, CONTROLLERS } = require('../../constants');

Route
    .group(() => {
        Route
            .resource(ROUTES.LINKS, CONTROLLERS.LINKS)
            .middleware(['auth'])
            .middleware(['role:admin, user'])
            .apiOnly();
    })
    .prefix('api/v1/');

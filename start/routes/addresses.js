'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const { ROUTES, CONTROLLERS } = require('../../constants');

Route
    .group(() => {
        Route
            .resource(ROUTES.ADDRESSES, CONTROLLERS.ADDRESSES)
            .middleware('auth')
            .middleware(new Map([
                [['index'], ['role:admin']],
            ]))
            .apiOnly();
        Route
            .get(`${ROUTES.ADDRESSES}/current`, `${CONTROLLERS.ADDRESSES}.addressOfCurrentUser`)
            .middleware(['auth'])
            .formats(['json']);
        Route
            .get(`${ROUTES.ADDRESSES}/user/:id`, `${CONTROLLERS.ADDRESSES}.findByUserId`)
            .middleware(['auth'])
            .formats(['json']);
        Route
            .delete(`${ROUTES.ADDRESSES}/user/:id`, `${CONTROLLERS.ADDRESSES}.deleteByUserId`)
            .middleware(['auth'])
            .formats(['json']);
    })
    .prefix('api/v1/');

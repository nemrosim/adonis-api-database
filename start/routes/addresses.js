'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const { ROUTES, CONTROLLERS } = require('../../constants');

Route
    .group(() => {
        /**
       * Get all addresses of current user
       */
        Route
            .resource(`${ROUTES.ADDRESSES}/current`, `${CONTROLLERS.CURRENT_USER_ADDRESSES}`)
            .middleware(['auth'])
            .middleware(['role:admin,user'])
            .formats(['json']);


        /**
       * Get all addresses of User by userId
       */
        Route
            .get(`${ROUTES.ADDRESSES}/user/:id`, `${CONTROLLERS.ADDRESSES}.findByUserId`)
            .middleware(['auth'])
            .middleware(new Map([
                [['index'], ['role:admin']],
            ]))
            .formats(['json']);

        /**
       * Delete all addresses of User by userId
       */
        Route
            .delete(`${ROUTES.ADDRESSES}/user/:id`, `${CONTROLLERS.ADDRESSES}.deleteByUserId`)
            .middleware(['auth'])
            .middleware(new Map([
                [['index'], ['role:admin']],
            ]))
            .formats(['json']);


        Route
            .resource(ROUTES.ADDRESSES, CONTROLLERS.ADDRESSES)
            .middleware(['auth'])
            .middleware(['role:admin'])
            .apiOnly();
    })
    .prefix('api/v1/');

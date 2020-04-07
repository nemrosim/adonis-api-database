'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route
    .group(() => {
        Route
            .resource('profiles', 'ProfileController')
            .middleware('auth')
            .validator(new Map([
                [['profiles.store'], ['StoreProfile']],
            ]))
            .apiOnly();
    })
    .prefix('api/v1/');

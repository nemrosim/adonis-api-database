'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route
    .group(() => {
        Route
            .resource('addresses', 'AddressController')
            .middleware('auth')
            .apiOnly();
        Route
            .get('addresses/current', 'AddressController.addressOfCurrentUser')
            .middleware('auth')
            .formats(['json']);
        Route
            .get('addresses/user/:id', 'AddressController.findByUserId')
            .middleware('auth')
            .formats(['json']);
        Route
            .delete('addresses/user/:id', 'AddressController.deleteByUserId')
            .middleware('auth')
            .formats(['json']);
    })
    .prefix('api/v1/');

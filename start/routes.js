'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

const ROUTES = {
    USERS: 'users',
    PROFILES: 'profiles',
};

Route
    .group(() => {
        Route
            .post('login', 'AuthController.login')
            .middleware(['guest'])
            .formats(['json']);

        Route
            .post('register', 'AuthController.register')
            .middleware(['guest'])
            .validator('RegisterUser')
            .formats(['json']);

        Route
            .get('users/current', 'UserController.current')
            .middleware('auth')
            .formats(['json']);

        Route
            .resource('profiles', 'ProfileController')
            .middleware('auth')
            .validator(new Map([
                [['profiles.store'], ['StoreProfile']],
            ]))
            .apiOnly();

        Route
            .resource('users', 'UserController')
            .middleware('auth')
            .validator(new Map([
                [['users.store'], ['StoreUser']],
                [['users.update'], ['StoreUser']],
            ]))
            .apiOnly();

        // ======== ADDRESS =======
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

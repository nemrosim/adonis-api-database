'use strict';

/*
|--------------------------------------------------------------------------
| AdminUserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const User = use('App/Models/User');
const Logger = use('Logger');
const { ROLES } = require('../../constants');

class UserSeeder {
    async run () {
        const ADMIN_USER_EMAIL = 'admin@gmail.com';
        const isPresent = await User.findBy('email', ADMIN_USER_EMAIL);
        // if user was not previously added in database
        if (!isPresent) {
            Logger
                .transport('file')
                .notice(`Admin user with email ${ADMIN_USER_EMAIL} not exist in database`);

            const adminUser = new User();

            adminUser.email = 'admin@gmail.com';
            adminUser.password = '123456';
            adminUser.role = ROLES.ADMIN;

            try {
                Logger
                    .transport('file')
                    .notice(`Admin user with email ${ADMIN_USER_EMAIL} created in database`);
                // save new admin user in database
                await adminUser.save();
            } catch (e) {
                Logger
                    .transport('file')
                    .error(`Admin user with email ${ADMIN_USER_EMAIL} was not created in database`);
            }
        } else {
            Logger
                .transport('file')
                .info(`Admin user with email ${ADMIN_USER_EMAIL} already exist in database`);
        }


        await Factory.model('App/Models/User')
            .createMany(10);
    }
}

module.exports = UserSeeder;

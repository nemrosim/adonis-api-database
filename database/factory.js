'use strict';

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Logger = use('Logger');
const { ROLES } = require('../constants');

Factory.blueprint('App/Models/User', async (faker) => {
    const email = faker.email();
    const password = faker.password();
    const role = ROLES.USER;

    Logger
        .transport('file')
        .debug(`New user created\nEmail: ${email}\nPassword: ${password}\nRole: ${role}`);


    return {
        email,
        password,
        role,
    };
});

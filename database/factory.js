'use strict';

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

Factory.blueprint('App/Models/Profile', async (faker) => ({
    name: faker.username(),
    surname: faker.username(),
    patronymic: faker.username(),
    date_of_birth: faker.date(),
}));

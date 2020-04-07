'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const { ROLES } = require('../../constants');

class UserSchema extends Schema {
    up () {
        this.create('users', (table) => {
            table.increments();
            table.string('email', 254)
                .notNullable()
                .unique();
            table.string('password', 254)
                .notNullable();
            table.enum('role', ROLES)
                .defaultTo(ROLES.USER); // user
            table.timestamps();
        });
    }

    down () {
        this.drop('users');
    }
}

module.exports = UserSchema;

'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const { ROLES, TABLE_NAMES } = require('../../constants');

class UserSchema extends Schema {
    async up () {
        const exists = await this.hasTable(TABLE_NAMES.USERS);

        if (!exists) {
            this.createTable(TABLE_NAMES.USERS, (table) => {
                table.increments('id');
                table.string('email', 254)
                    .notNullable()
                    .unique();
                table.string('password', 254)
                    .notNullable();
                table.enum('role', Object.values(ROLES))
                    .defaultTo(ROLES.USER);
                table.timestamps();
            });
        }
    }


    down () {
        this.dropTableIfExists(TABLE_NAMES.USERS);
    }
}

module.exports = UserSchema;

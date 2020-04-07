'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const { TABLE_NAMES, FOREIGN_KEYS } = require('../../constants');

class ProfileSchema extends Schema {
    async up () {
        const exists = await this.hasTable(TABLE_NAMES.PROFILES);
        if (!exists) {
            this.createTable(TABLE_NAMES.PROFILES, (table) => {
                table.increments('id');
                table.integer(FOREIGN_KEYS.USER_ID)
                    .unsigned()
                    .references('id')
                    .inTable(TABLE_NAMES.USERS)
                    .notNullable()
                    .unique();
                table.string('name', 40);
                table.string('surname', 50);
                table.string('patronymic', 50);
                table.date('date_of_birth');
                table.timestamps();
            });
        }
    }

    down () {
        this.dropTableIfExists(TABLE_NAMES.PROFILES);
    }
}

module.exports = ProfileSchema;

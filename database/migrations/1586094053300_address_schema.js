'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const { TABLE_NAMES, FOREIGN_KEYS } = require('../../constants');

class AddressSchema extends Schema {
    async up () {
        const exists = await this.hasTable(TABLE_NAMES.ADDRESSES);
        if (!exists) {
            this.create(TABLE_NAMES.ADDRESSES, (table) => {
                table.increments('id');
                table.integer(FOREIGN_KEYS.USER_ID)
                    .unsigned()
                    .references('id')
                    .inTable(TABLE_NAMES.USERS)
                    .notNullable();
                table.string('country', 100)
                    .notNullable();
                table.string('region_state', 100);
                table.string('city_town', 254);
                table.string('street', 254);
                table.string('house', 254);
                table.string('apartment', 254);
                table.string('postal_code', 254);
                table.timestamps();
            });
        }
    }

    down () {
        this.dropTableIfExists(TABLE_NAMES.ADDRESSES);
    }
}

module.exports = AddressSchema;

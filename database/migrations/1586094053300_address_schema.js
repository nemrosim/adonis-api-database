'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddressSchema extends Schema {
    up () {
        this.create('addresses', (table) => {
            table.increments();
            table.integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
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

    down () {
        this.drop('addresses');
    }
}

module.exports = AddressSchema;

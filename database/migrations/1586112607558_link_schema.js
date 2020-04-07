'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const { TABLE_NAMES, FOREIGN_KEYS } = require('../../constants');

class LinkSchema extends Schema {
    async up () {
        const exists = await this.hasTable(TABLE_NAMES.ADDRESSES);
        if (!exists) {
            this.create('links', (table) => {
                table.increments('id');
                table.integer(FOREIGN_KEYS.USER_ID)
                    .unsigned()
                    .references('id')
                    .inTable(TABLE_NAMES.USERS)
                    .unique()
                    .notNullable();
                table.string('facebook', 254)
                    .unique();
                table.string('twitter', 254)
                    .unique();
                table.string('instagram', 254)
                    .unique();
                table.string('linkedin', 254)
                    .unique();
                table.timestamps();
            });
        }
    }

    down () {
        this.drop('links');
    }
}

module.exports = LinkSchema;

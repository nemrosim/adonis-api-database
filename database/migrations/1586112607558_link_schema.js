'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const { TABLE_NAMES, FOREIGN_KEYS } = require('../../constants');

class LinkSchema extends Schema {
    async up () {
        const exists = await this.hasTable(TABLE_NAMES.LINKS);
        if (!exists) {
            this.create(TABLE_NAMES.LINKS, (table) => {
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
        this.dropTableIfExists(TABLE_NAMES.LINKS);
    }
}

module.exports = LinkSchema;

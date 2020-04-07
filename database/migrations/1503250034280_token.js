'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const { TABLE_NAMES, FOREIGN_KEYS } = require('../../constants');

class TokensSchema extends Schema {
    async up () {
        const exists = await this.hasTable(TABLE_NAMES.TOKENS);
        if (!exists) {
            this.createTable(TABLE_NAMES.TOKENS, (table) => {
                table.increments('id');
                table.integer(FOREIGN_KEYS.USER_ID)
                    .unsigned()
                    .references('id')
                    .inTable(TABLE_NAMES.USERS);
                table.string('token', 255)
                    .notNullable()
                    .unique()
                    .index();
                table.string('type', 80)
                    .notNullable();
                table.boolean('is_revoked')
                    .defaultTo(false);
                table.timestamps();
            });
        }
    }

    down () {
        this.dropTableIfExists(TABLE_NAMES.TOKENS);
    }
}

module.exports = TokensSchema;

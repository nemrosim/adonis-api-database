'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LinkSchema extends Schema {
    up () {
        this.create('links', (table) => {
            table.increments();
            table.integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
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

    down () {
        this.drop('links');
    }
}

module.exports = LinkSchema;

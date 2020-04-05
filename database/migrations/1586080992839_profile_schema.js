'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProfileSchema extends Schema {
    up () {
        this.create('profiles', (table) => {
            table.increments();
            table.integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .notNullable()
                .unique();
            table.string('name', 40);
            table.string('surname', 50);
            table.string('patronymic', 50);
            table.date('date_of_birth');
            table.timestamps();
        });
    }

    down () {
        this.drop('profiles');
    }
}

module.exports = ProfileSchema;

'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Profile extends Model {
    static get dates () {
        return super.dates.concat(['date_of_birth']);
    }

    static formatDates (field, value) {
        if (field === 'dateOfBirth') {
            return value.format('YYYY-MM-DD');
        }
        return super.formatDates(field, value);
    }

    static castDates (field, value) {
        if (field === 'date_of_birth') {
            return value.format('YYYY-MM-DD');
        }
        return super.formatDates(field, value);
    }

    user () {
        return this.belongsTo('App/Models/User', 'user_id', 'id');
    }
}

module.exports = Profile;

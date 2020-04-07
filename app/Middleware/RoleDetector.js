'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Logger = use('Logger');

class RoleDetector {
    async handle ({ auth, request }, next, props) {
        Logger.info('RoleDetector. Role: %s', props);

        await next();
    }
}

module.exports = RoleDetector;

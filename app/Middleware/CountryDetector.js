'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const geoip = use('geoip-lite');
const Logger = use('Logger');

class CountryDetector {
    /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
    async handle ({ request }, next) {
        const ip = request.ip();
        Logger.notice('IP: %s', ip);

        // if (ip !== '127.0.0.1') {
        //     request.country = geoip.lookup(ip).country;
        // }

        await next();
    }

    /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
    async wsHandle ({ request }, next) {
    // call next to advance the request
        await next();
    }
}

module.exports = CountryDetector;

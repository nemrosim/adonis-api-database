'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Logger = use('Logger');
const { ROLES } = require('../../constants');

class RoleDetector {
    async handle ({ auth, response }, next, props) {
        const roles = [];
        props.forEach((prop) => {
            Logger.notice('ROLE:%s', prop);

            Object.keys(ROLES)
                .forEach((key) => {
                    if (prop.toLowerCase() === ROLES[key].toLowerCase()) {
                        roles.push(prop);
                    }
                });
        });

        Logger.debug('RoleDetector. Passes roles %s', roles);

        if (!roles.length) {
            Logger.warning('RoleDetector. Roles not specified');

            // 501 status => "Not implemented"
            response.status(501)
                .send({
                    error: 'Roles not specified for this endpoint',
                });
        } else {
            const user = await auth.getUser();

            Logger.debug('RoleDetector. User role: %s', user.role);

            if (!roles.includes(user.role)) {
                response.send({
                    error: 'You dont have permission to do that',
                });
            } else {
                await next();
            }
        }
    }
}

module.exports = RoleDetector;

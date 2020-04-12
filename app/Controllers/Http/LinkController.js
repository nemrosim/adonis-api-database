'use strict';

const Link = use('App/Models/Link');
const Logger = use('Logger');

class LinkController {
    async index () {
        Logger.info('====== GET ALL LINKS ============');
        return await Link.query()
            .fetch();
    }
}

module.exports = LinkController;

'use strict';

class ServerController {
    async serverCheck ({ request }) {
        return 'Server workrs';
    }
}

module.exports = ServerController;

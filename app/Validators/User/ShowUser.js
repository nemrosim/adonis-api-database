/* eslint-disable prefer-object-spread */

'use strict';

class ShowUser {
    get validateAll () {
        return true;
    }

    get rules () {
        return {
            id: 'required|integer',
        };
    }

    get data () {
        const requestBody = this.ctx.request.get();
        const { id } = this.ctx.params;

        return Object.assign({
        }, requestBody, {
            id,
        });
    }

    get messages () {
        return {
            // Email
            'id.required': 'id is not present in params',
            'id.integer': 'id is not an integer',
        };
    }

    get sanitizationRules () {
        return {
            email: 'normalize_email',
        };
    }

    async fails (errorMessages) {
        return this.ctx.response.send(errorMessages);
    }
}

module.exports = ShowUser;

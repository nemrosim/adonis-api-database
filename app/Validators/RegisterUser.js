'use strict';

class RegisterUser {
    /**
   * Will use validateAll function instead of validate()
   * @returns {boolean}
   */
    get validateAll () {
        return true;
    }

    get rules () {
        return {
            email: 'required|email|unique:users,email',
            password: 'required',
        };
    }

    get messages () {
        return {
            'email.required': 'Email is not present in request',
            'email.email': 'Enter a valid email address.',
            'email.unique': 'Email is already present in db',
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

module.exports = RegisterUser;

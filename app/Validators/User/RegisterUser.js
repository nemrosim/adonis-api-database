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
            email: 'required|email|unique:users,email|max:254',
            password: 'required|min:6|max:254',
        };
    }

    get messages () {
        return {
            // Email
            'email.required': 'Email is not present in request',
            'email.email': 'Enter a valid email address.',
            'email.unique': 'Email is already present in db',
            'email.max': 'Email length should not be more than 254 characters',
            // Password
            'password.required': 'Password should be present in the request',
            'password.max': 'Password length should not be more than 254 characters',
            'password.min': 'Password length should be more than 5 characters',
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

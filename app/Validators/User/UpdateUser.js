'use strict';

class UpdateUser {
    get validateAll () {
        return true;
    }

    get rules () {
        return {
            email: 'required|email|unique:users,email',
            password: 'required|min:6',
        };
    }

    get messages () {
        return {
            'email.required': 'Email is not present in request',
            'email.email': 'Enter a valid email address.',
            'email.unique': 'Email is already present in db',
            'password.required': 'Password is required.',
            'password.min': 'Min length of a password is 6 characters.',
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

module.exports = UpdateUser;

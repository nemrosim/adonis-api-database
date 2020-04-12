'use strict';

class ChangePasswordUser {
    get validateAll () {
        return true;
    }

    get rules () {
        return {
            oldPassword: 'required|min:6',
            newPassword: 'required|min:6',
        };
    }

    get messages () {
        return {
            'oldPassword.required': 'Old password is required.',
            'oldPassword.min': 'Min length of an old password should be 6 characters.',
            'newPassword.required': 'New password is required.',
            'newPassword.min': 'Min length of a new password should be 6 characters.',
        };
    }

    async fails (errorMessages) {
        return this.ctx.response.send(errorMessages);
    }
}

module.exports = ChangePasswordUser;

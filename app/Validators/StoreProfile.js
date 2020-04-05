'use strict';

class StoreProfile {
    /**
   * Will use validateAll function instead of validate()
   * @returns {boolean}
   */
    get validateAll () {
        return true;
    }

    get rules () {
        return {
            //                          table name, column
            userId: 'required|integer|unique:profiles,user_id',
            name: 'required|alpha|min:3|max:40',
            surname: 'required|alpha|min:3|max:40',
            patronymic: 'alpha|min:3|max:40',
            dateOfBirth: 'required|date',
        };
    }

    get messages () {
        const { userId } = this.ctx.request.post();
        return {
            // userId
            'userId.required': 'userId is not present in request',
            'userId.unique': `User with ID:${userId} is already has a profile data`,
            'userId.integer': 'userId is not an integer',
            // name
            'name.required': 'Name is not present in request',
            'surname.required': 'Surname is not present in request',
            'dateOfBirth.required': 'Date is not present in request',
        };
    }

    async fails (errorMessages) {
        return this.ctx.response.send(errorMessages);
    }
}

module.exports = StoreProfile;

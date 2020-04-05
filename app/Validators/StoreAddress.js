'use strict';

class StoreAddress {
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
            country: 'required|integer|unique:profiles,user_id',
            regionState: 'required|alpha|min:3|max:40',
            cityTown: 'required|alpha|min:3|max:40',
            street: 'required|alpha|min:3|max:40',
            house: 'required|date',
            apartment: 'required|date',
            postal_code: 'required|date',
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
            'patronymic.required': 'Patronymic a valid email address.',
            'dateOfBirth.required': 'Date is not present in request',
        };
    }

    async fails (errorMessages) {
        return this.ctx.response.send(errorMessages);
    }
}

module.exports = StoreAddress;

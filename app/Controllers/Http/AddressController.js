'use strict';

const Address = use('App/Models/Address');
const Logger = use('Logger');

class AddressController {
    async index () {
        return await Address.query()
            .with('user')
            .fetch();
    }

    async show ({ params }) {
        const ADDRESS_ID = params.id;
        const address = await Address.findBy('id', ADDRESS_ID);
        if (address) {
            return address;
        }
        return {
            error: `Address not found by ID:${ADDRESS_ID}`,
        };
    }

    async store ({ auth, request, response }) {
        try {
            const user = await auth.getUser();
            Logger.error('auth %j', user);
        } catch (error) {
            response.send('Missing or invalid api token');
        }
        const { userId,
            country,
            regionState,
            cityTown,
            street,
            house,
            apartment,
            postalCode } = request.post();

        const address = new Address();

        address.user_id = userId;
        address.country = country;
        address.region_state = regionState;
        address.city_town = cityTown;
        address.street = street;
        address.house = house;
        address.apartment = apartment;
        address.postal_code = postalCode;

        await address.save();
    }


    async update ({ request, params }) {
        const user = await Address.find(params.id);

        const { password, email } = request.post();

        user.password = password;
        user.email = email;

        await user.save();
    }


    async destroy ({ params }) {
        const ADDRESS_ID = params.id;

        const address = await Address.findAllBy('user_id', ADDRESS_ID);
        await address.delete();
    }

    async addressOfCurrentUser ({ auth }) {
        return await Address.query()
            .where('id', auth.user.id)
            .with('profile')
            .fetch();
    }

    async findByUserId ({ params }) {
        const USER_ID = params.id;
        const address = await Address.query()
            .where('user_id', USER_ID)
            .fetch();
        if (address) {
            return address;
        }
        return {
            error: `Address not found by UserID:${USER_ID}`,
        };
    }

    async deleteByUserId ({ params }) {
        const USER_ID = params.id;
        const address = await Address.query()
            .where('user_id', USER_ID)
            .fetch();
        if (address.length > 0) {
            const result = await Address.query()
                .where('user_id', USER_ID)
                .delete();
            return {
                message: `Deleted amount of addresses: ${result}`,
            };
        }
        return {
            error: `Addresses not found by UserID:${USER_ID}`,
        };
    }
}

module.exports = AddressController;

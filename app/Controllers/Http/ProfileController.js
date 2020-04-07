'use strict';

const Profile = use('App/Models/Profile');
const User = use('App/Models/User');

class ProfileController {
    async index () {
        return await Profile.all();
    }

    async store ({ request }) {
        const { userId, name, surname, patronymic, dateOfBirth } = request.post();
        const user = await User.find(userId);

        if (user) {
            const profile = new Profile();

            profile.user_id = user.id;
            profile.name = name;
            profile.surname = surname;
            profile.patronymic = patronymic;
            profile.date_of_birth = dateOfBirth;

            await profile.save();
        } else {
            return {
                error: `User was not found by ID:${userId}`,
            };
        }
    }

    async update ({ request, params }) {
        return 'In development';
    }

    async show ({ params }) {
        return await Profile.query()
            .where('id', params.id)
            .with('user')
            .fetch();
    }

    async destroy ({ params }) {
        const profile = await Profile.find(params.id);

        await profile.delete();
    }
}

module.exports = ProfileController;

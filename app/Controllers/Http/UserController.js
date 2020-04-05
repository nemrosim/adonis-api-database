'use strict';

const User = use('App/Models/User');
const Profile = use('App/Models/Profile');
const Logger = use('Logger');

class UserController {
    async index () {
        return await User.query()
            .with('profile')
            .with('addresses')
            .fetch();
    }

    async store ({ request }) {
        const { password, email } = request.post();
        const user = new User();

        user.password = password;
        user.email = email;

        await user.save();
    }

    /**
   * Get USER data by ID retrieved from JWT token
   * @param auth
   * @return {Promise<Response>}
   */
    async current ({ auth }) {
        return await User.query()
            .where('id', auth.user.id)
            .with('profile')
            .fetch();
    }

    async update ({ request, params }) {
        const user = await User.find(params.id);

        const { password, email } = request.post();

        user.password = password;
        user.email = email;

        await user.save();
    }

    async show ({ params }) {
        return await User.find(params.id);
    }

    async destroy ({ auth, params }) {
        const USER_ID = params.id;
        if (auth.user.id === Number.parseInt(USER_ID, 10)) {
            return {
                error: 'Trying to delete current user',
            };
        }
        const profile = await Profile.findBy('user_id', USER_ID);

        if (profile) {
            await profile.delete();
        }

        const user = await User.find(USER_ID);

        await user.delete();
    }
}

module.exports = UserController;

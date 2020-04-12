'use strict';

const User = use('App/Models/User');
const Hash = use('Hash');
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

    async changePassword ({ auth, request, response }) {
        const { oldPassword, newPassword } = request.post();

        if (oldPassword === newPassword) {
            response.status(403)
                .send({
                    error: 'Old password and new Password are exactly the same',
                });
        }

        const user = await auth.getUser();

        const isSame = await Hash.verify(oldPassword, user.password);
        if (isSame) {
            user.password = newPassword;
            const result = await user.save();
            if (result) {
                return 'User was saved';
            }
            return 'Error during saving new password';
        }
        response.status(403)
            .send({
                error: 'Old password is not correct',
            });
    }

    async changeEmail ({ request, params }) {
        const user = await User.find(params.id);

        const { password, email } = request.post();

        user.password = password;
        user.email = email;

        await user.save();
    }

    async show ({ params, response }) {
        Logger.info('== USER SHOW METHOD =');

        const user = await User.find(params.id);
        if (user) {
            return user;
        }
        response.status(404)
            .send({
                error: `User not found by ID:${params.id}`,
            });
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

'use strict';

const User = use('App/Models/User');

class UserController {
    async index () {
        return await User.all();
    }

    async store ({ request }) {
        const { username, password, email } = request.post();
        const user = new User();
        user.username = username;
        user.password = password;
        user.email = email;

        await user.save();
    }

    async update ({ request, params }) {
        const user = await User.find(params.id);

        const { username, password, email } = request.post();

        user.username = username;
        user.password = password;
        user.email = email;

        await user.save();
    }

    async show ({ params }) {
        await User.find(params.id);
    }

    async destroy ({ params }) {
        const user = await User.find(params.id);

        await user.delete();
    }
}

module.exports = UserController;

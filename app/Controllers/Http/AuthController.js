'use strict';

const User = use('App/Models/User');

class AuthController {
    async login ({ auth, request }) {
        const { refreshToken, email, password } = request.post();

        if (refreshToken) {
            return await auth
                .generateForRefreshToken(refreshToken);
        }
        return auth
            .withRefreshToken()
            .attempt(email, password);
    }

    async register ({ request }) {
        const { email } = request.post();

        const found = await User.findBy('email', email);
        if (found) {
            return {
                found,
            };
        }
        const { password } = request.post();
        const user = new User();
        user.password = password;
        user.email = email;

        await user.save();
    }
}

module.exports = AuthController;

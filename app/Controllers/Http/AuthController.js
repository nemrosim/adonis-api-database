'use strict';

const User = use('App/Models/User');
const Logger = use('Logger');
const Mail = use('Mail');
const Env = use('Env');

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

        const isExist = await User.findBy('email', email);
        if (isExist) {
            return {
                found: isExist,
            };
        }
        const { password } = request.post();
        const user = new User();
        user.password = password;
        user.email = email;

        const savedUser = await user.save();
        if (savedUser) {
            Logger.info('=== SENDING EMAIL ===');
            const result = await Mail.send('email-verify', user.toJSON(), (message) => {
                message.from(Env.get('MAIL_USERNAME'));
                message.to('nemrosim1988@gmail.com');
            });

            Logger.info(result);
            return 'SEND';
        }
        return 'user was not created';
    }
}

module.exports = AuthController;

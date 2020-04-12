'use strict';

const User = use('App/Models/User');
const Logger = use('Logger');
const Mail = use('Mail');

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

    async sendEmail ({ request }) {
        Logger.info('=== SENDING EMAIL ===');
        const result = await Mail.raw('<h1>HELLO</h1>', (message) => {
            message.from('foo@bar.com');
            message.to('nemrosim1988@gmail.com');
        });

        Logger.info(result);
        return 'SEND';
    }
}

module.exports = AuthController;

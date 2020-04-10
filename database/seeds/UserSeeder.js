'use strict';

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const User = use('App/Models/User');
const Logger = use('Logger');
const { ROLES } = require('../../constants');

/**
 * This will help us to create 10 users with 10 Profiles, using async in array
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/for-await...of
 * @type {{[Symbol.asyncIterator](): {next(): (Promise<{value, done: boolean}>), i: number}}}
 */
const asyncIterable = {
    [Symbol.asyncIterator] () {
        return {
            i: 0,
            next () {
                if (this.i < 10) {
                    return Promise.resolve({
                        value: this.i++, done: false,
                    });
                }

                return Promise.resolve({
                    done: true,
                });
            },
        };
    },
};

class UserSeeder {
    async run () {
        const ADMIN_USER_EMAIL = 'admin@gmail.com';
        const isPresent = await User.findBy('email', ADMIN_USER_EMAIL);
        // if user was not previously added in database
        if (!isPresent) {
            Logger
                .transport('file')
                .notice(`Admin user with email ${ADMIN_USER_EMAIL} not exist in database`);

            const adminUser = new User();

            adminUser.email = 'admin@gmail.com';
            adminUser.password = '123456';
            adminUser.role = ROLES.ADMIN;

            try {
                Logger
                    .transport('file')
                    .notice(`Admin user with email ${ADMIN_USER_EMAIL} created in database`);
                // save new admin user in database
                await adminUser.save();
            } catch (e) {
                Logger
                    .transport('file')
                    .error(`Admin user with email ${ADMIN_USER_EMAIL} was not created in database`);
            }
        } else {
            Logger
                .transport('file')
                .info(`Admin user with email ${ADMIN_USER_EMAIL} already exist in database`);
        }

        // Next you will see different implementations of filling database
      // with one and multiple fake data

      /**
       * This is a simple example of creating one user with one profile
       */
      const user = await Factory.model('App/Models/User')
            .create(); // this will save new User in database
        const profile = await Factory.model('App/Models/Profile')
            .make(); // this will only create Profile, without saving it to database

        await user.profile()
            .save(profile); // and only this will save new Profile with connecting to User


      /**
       * And this is more complex example of creating
       * multiple users with one unique profile for each.
       */
      (async function processArray () {
            for (const item of new Array(10)) {
                const user = await Factory.model('App/Models/User')
                    .create();
                const profile = await Factory.model('App/Models/Profile')
                    .make();

                await user.profile()
                    .save(profile);
            }
        }());


      /**
       * And this is with using helper functions
       * with previous result. 10 Users and 10 Profiles
       */
      (async function() {
        for await (let num of asyncIterable) {
          const user = await Factory.model('App/Models/User')
            .create();
          const profile = await Factory.model('App/Models/Profile')
            .make();

          await user.profile()
            .save(profile);
        }
      })();

      /**
       * And this example with using generator function :)
       */
      (function* () {
        const user = yield Factory.model('App/Models/User')
          .create();
        const profile = yield Factory.model('App/Models/Profile')
          .make();

        yield user.profile()
          .save(profile);
      })();
    }
}

module.exports = UserSeeder;

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

const createUserIfNotExist = async ({ isPresent, role, email, password }) => {
    if (!isPresent) {
        Logger
            .transport('file')
            .notice(`User with email ${email} not exist in database`);

        const user = new User();

        user.email = email;
        user.password = password;
        user.role = role;

        try {
            Logger
                .transport('file')
                .notice(`User with email ${email} created in database`);
            // save new admin user in database
            await user.save();
        } catch (e) {
            Logger
                .transport('file')
                .error(`User with email ${email} was not created in database`);
        }
    } else {
        Logger
            .transport('file')
            .info(`User with email ${email} already exist in database`);
    }
};

const createOneUser = async () => {
    /**
   * This is a simple example of creating one user with one profile
   */
    const user = await Factory.model('App/Models/User')
        .create(); // this will save new User in database
    const profile = await Factory.model('App/Models/Profile')
        .make(); // this will only create Profile, without saving it to database

    /**
   * and only this will save new Profile with connecting to User
   */
    await user.profile()
        .save(profile);
};

/**
 * And this example with using generator function
 * @return {Generator<Promise|Promise<*>|Promise<*>, void, *>}
 */
function* createOneUser_generator() {
  const user = yield Factory.model('App/Models/User')
    .create();
  const profile = yield Factory.model('App/Models/Profile')
    .make();

  yield user.profile()
    .save(profile);
}

/**
 * And this is more complex example of creating
 * multiple users with one unique profile for each.
 */
async function createMultipleUsersWithProfiles () {
    for (const item of new Array(10)) {
        const user = await Factory.model('App/Models/User')
            .create();
        const profile = await Factory.model('App/Models/Profile')
            .make();

        await user.profile()
            .save(profile);
    }
}

/**
 * And this is with using helper functions
 * with previous result. 10 Users and 10 Profiles
 *
 * @return {Promise<void>}
 */
async function createMultipleUsersWithProfiles_v2 () {
  for await (let num of asyncIterable) {
    const user = await Factory.model('App/Models/User')
      .create();
    const profile = await Factory.model('App/Models/Profile')
      .make();

    await user.profile()
      .save(profile);
  }
}

class UserSeeder {
    async run () {
        const ADMIN_USER_EMAIL = 'admin@gmail.com';
        const USER_USER_EMAIL = 'user@gmail.com';
        const isAdminPresent = await User.findBy('email', ADMIN_USER_EMAIL);
        const isUserPresent = await User.findBy('email', USER_USER_EMAIL);

        await createUserIfNotExist({
            isPresent: isAdminPresent,
            email: ADMIN_USER_EMAIL,
            password: '123456',
            role: ROLES.ADMIN,
        });
        await createUserIfNotExist({
            isPresent: isUserPresent,
            email: USER_USER_EMAIL,
            password: '123456',
            role: ROLES.USER,
        });

        await createOneUser();
        await createOneUser_generator();
        await createMultipleUsersWithProfiles();
        await createMultipleUsersWithProfiles_v2();

    }
}

module.exports = UserSeeder;

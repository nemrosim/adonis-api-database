const ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
};

const ROUTES = {
    USERS: 'users',
    PROFILES: 'profiles',
    ADDRESSES: 'addresses',
    LOGIN: 'login',
    REGISTER: 'register',
};

const CONTROLLERS = {
    ADDRESSES: 'AddressController',
    AUTH: 'AuthController',
    PROFILE_CONTROLLER: 'ProfileController',
    USER_CONTROLLER: 'UserController',
};

const VALIDATORS = {
    REGISTER_USER: 'RegisterUser',
    STORE_ADDRESS: 'StoreAddress',
    STORE_PROFILE: 'StoreProfile',
    STORE_USER: 'StoreUser',
};

module.exports = {
    ROLES, ROUTES, CONTROLLERS, VALIDATORS,
};

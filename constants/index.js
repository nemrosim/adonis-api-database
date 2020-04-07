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
    CURRENT_USER_ADDRESSES: 'CurrentUserAddressController',
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

const TABLE_NAMES = {
    USERS: 'users',
    TOKENS: 'tokens',
    PROFILES: 'profiles',
    ADDRESSES: 'addresses',
};

const FOREIGN_KEYS = {
    USER_ID: 'user_id',
};

module.exports = {
    ROLES, ROUTES, CONTROLLERS, VALIDATORS, TABLE_NAMES, FOREIGN_KEYS,
};

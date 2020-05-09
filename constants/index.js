const ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
};

const ROUTES = {
    USERS: 'users',
    PROFILES: 'profiles',
    ADDRESSES: 'addresses',
    LINKS: 'links',
    LOGIN: 'login',
    REGISTER: 'register',
    SEND_EMAIL: 'sendEmail',
    SERVER: 'server',
    FILE_UPLOAD: 'upload',
};

const CONTROLLERS = {
    ADDRESSES: 'AddressController',
    CURRENT_USER_ADDRESSES: 'CurrentUserAddressController',
    LINKS: 'LinkController',
    AUTH: 'AuthController',
    PROFILE_CONTROLLER: 'ProfileController',
    USER_CONTROLLER: 'UserController',
    SERVER: 'ServerController',
    FILES: 'FilesController',
};

const VALIDATORS = {
    REGISTER_USER: 'User/RegisterUser',
    STORE_USER: 'User/StoreUser',
    SHOWS_USER: 'User/ShowUser',
    CHANGE_PASSWORD_USER: 'User/ChangePasswordUser',
    CHANGE_EMAIL_USER: 'User/ChangeEmailUser',
    STORE_ADDRESS: 'StoreAddress',
    STORE_PROFILE: 'StoreProfile',
};

const TABLE_NAMES = {
    USERS: 'users',
    TOKENS: 'tokens',
    PROFILES: 'profiles',
    ADDRESSES: 'addresses',
    LINKS: 'links',
};

const FOREIGN_KEYS = {
    USER_ID: 'user_id',
};

const MIME_TYPES = {
    application: 'application',
    audio: 'audio',
    example: 'example',
    image: 'image',
    message: 'message',
    model: 'model',
    multipart: ' multipart',
    text: 'text',
    video: 'video',
};

module.exports = {
    ROLES, ROUTES, CONTROLLERS, VALIDATORS, TABLE_NAMES, FOREIGN_KEYS, MIME_TYPES,
};

'use strict';

const providers = [
    '@adonisjs/framework/providers/AppProvider',
    '@adonisjs/auth/providers/AuthProvider',
    '@adonisjs/bodyparser/providers/BodyParserProvider',
    '@adonisjs/cors/providers/CorsProvider',
    '@adonisjs/lucid/providers/LucidProvider',
    '@adonisjs/validator/providers/ValidatorProvider',
    '@adonisjs/mail/providers/MailProvider',
    '@adonisjs/framework/providers/ViewProvider',
    '@adonisjs/drive/providers/DriveProvider',
];

/**
 * Ace providers are required only when running ace commands. For example
 * Providers for migrations, tests etc.
 */
const aceProviders = [
    '@adonisjs/lucid/providers/MigrationsProvider',
    '@adonisjs/vow/providers/VowProvider',
];

/**
 * Aliases are short unique names for IoC container bindings.
 * You are free to create your own aliases.
 *
 * For example:
 *   { Route: 'Adonis/Src/Route' }
 * @type {{}}
 */
const aliases = {
};

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = [];

module.exports = {
    providers, aceProviders, aliases, commands,
};

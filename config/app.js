'use strict';

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');
const { format } = require('winston');

const moment = use('moment');

const { combine, timestamp, label, prettyPrint, printf, align, splat, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => `${level.toUpperCase()} [${timestamp}] [${moment(timestamp)
    .format('YYYY MMMM DD, h:mm:ss')}]\n${message}`);

module.exports = {
    name: Env.get('APP_NAME', 'AdonisJs'),
    appKey: Env.getOrFail('APP_KEY'),

    http: {
    /*
    |--------------------------------------------------------------------------
    | Allow Method Spoofing
    |--------------------------------------------------------------------------
    |
    | Method spoofing allows to make requests by spoofing the http verb.
    | Which means you can make a GET request but instruct the server to
    | treat as a POST or PUT request. If you want this feature, set the
    | below value to true.
    |
    */
        allowMethodSpoofing: true,

        /*
    |--------------------------------------------------------------------------
    | Trust Proxy
    |--------------------------------------------------------------------------
    |
    | Trust proxy defines whether X-Forwarded-* headers should be trusted or not.
    | When your application is behind a proxy server like nginx, these values
    | are set automatically and should be trusted. Apart from setting it
    | to true or false Adonis supports handful or ways to allow proxy
    | values. Read documentation for that.
    |
    */
        trustProxy: false,

        /*
    |--------------------------------------------------------------------------
    | Subdomains
    |--------------------------------------------------------------------------
    |
    | Offset to be used for returning subdomains for a given request.For
    | majority of applications it will be 2, until you have nested
    | sudomains.
    | cheatsheet.adonisjs.com      - offset - 2
    | virk.cheatsheet.adonisjs.com - offset - 3
    |
    */
        subdomainOffset: 2,

        /*
    |--------------------------------------------------------------------------
    | JSONP Callback
    |--------------------------------------------------------------------------
    |
    | Default jsonp callback to be used when callback query string is missing
    | in request url.
    |
    */
        jsonpCallback: 'callback',


        /*
    |--------------------------------------------------------------------------
    | Etag
    |--------------------------------------------------------------------------
    |
    | Set etag on all HTTP response. In order to disable for selected routes,
    | you can call the `response.send` with an options object as follows.
    |
    | response.send('Hello', { ignoreEtag: true })
    |
    */
        etag: false,
    },

    views: {
    /*
    |--------------------------------------------------------------------------
    | Cache Views
    |--------------------------------------------------------------------------
    |
    | Define whether or not to cache the compiled view. Set it to true in
    | production to optimize view loading time.
    |
    */
        cache: Env.get('CACHE_VIEWS', true),
    },

    static: {
    /*
    |--------------------------------------------------------------------------
    | Dot Files
    |--------------------------------------------------------------------------
    |
    | Define how to treat dot files when trying to server static resources.
    | By default it is set to ignore, which will pretend that dotfiles
    | does not exists.
    |
    | Can be one of the following
    | ignore, deny, allow
    |
    */
        dotfiles: 'ignore',

        /*
    |--------------------------------------------------------------------------
    | ETag
    |--------------------------------------------------------------------------
    |
    | Enable or disable etag generation
    |
    */
        etag: true,

        /*
    |--------------------------------------------------------------------------
    | Extensions
    |--------------------------------------------------------------------------
    |
    | Set file extension fallbacks. When set, if a file is not found, the given
    | extensions will be added to the file name and search for. The first
    | that exists will be served. Example: ['html', 'htm'].
    |
    */
        extensions: false,
    },

    locales: {
    /*
    |--------------------------------------------------------------------------
    | Loader
    |--------------------------------------------------------------------------
    |
    | The loader to be used for fetching and updating locales. Below is the
    | list of available options.
    |
    | file, database
    |
    */
        loader: 'file',

        /*
    |--------------------------------------------------------------------------
    | Default Locale
    |--------------------------------------------------------------------------
    |
    | Default locale to be used by Antl provider. You can always switch drivers
    | in runtime or use the official Antl middleware to detect the driver
    | based on HTTP headers/query string.
    |
    */
        locale: 'en',
    },

    logger: {
        transport: 'console',
        console: {
            driver: 'console',
            name: 'adonis-app',
            level: 'debug',
        },
        file: {
            driver: 'file',
            name: 'adonis-app',
            filename: 'adonis.log',
            level: 'debug',
            format: combine(
                timestamp(),
                // prettyPrint(),
                myFormat,
            ),
        },
    },

    /*
  |--------------------------------------------------------------------------
  | Generic Cookie Options
  |--------------------------------------------------------------------------
  |
  | The following cookie options are generic settings used by AdonisJs to create
  | cookies. However, some parts of the application like `sessions` can have
  | separate settings for cookies inside `config/session.js`.
  |
  */
    cookie: {
        httpOnly: true,
        sameSite: false,
        path: '/',
        maxAge: 7200,
    },
};

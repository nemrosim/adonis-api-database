'use strict';

const Env = use('Env');

// adonis-api-database@ukr.net
// Adonis!API_234-database-smtp
// j0d3TwW0xFsDLdHH

module.exports = {
    /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | Connection to be used for sending emails. Each connection needs to
  | define a driver too.
  |
  */
    connection: Env.get('MAIL_CONNECTION', 'smtp'),

    /*
  |--------------------------------------------------------------------------
  | SMTP
  |--------------------------------------------------------------------------
  |
  | Here we define configuration for sending emails via SMTP.
  |
  */
    smtp: {
        driver: 'smtp',
        pool: true,
        port: Env.get('SMTP_PORT', 2525),
        host: Env.get('SMTP_HOST', 'smtp.ukr.net'),
        secure: true,
        auth: {
            user: Env.get('MAIL_USERNAME', 'adonis-api-database@ukr.net'),
            pass: Env.get('MAIL_PASSWORD', 'j0d3TwW0xFsDLdHH'),
        },
        maxConnections: 5,
        maxMessages: 100,
        rateLimit: 10,
    },

    /*
  |--------------------------------------------------------------------------
  | SparkPost
  |--------------------------------------------------------------------------
  |
  | Here we define configuration for spark post. Extra options can be defined
  | inside the `extra` object.
  |
  | https://developer.sparkpost.com/api/transmissions.html#header-options-attributes
  |
  | extras: {
  |   campaign_id: 'sparkpost campaign id',
  |   options: { // sparkpost options }
  | }
  |
  */
    sparkpost: {
        driver: 'sparkpost',
        apiKey: Env.get('SPARKPOST_API_KEY'),
        extras: {
        },
    },

    /*
  |--------------------------------------------------------------------------
  | Mailgun
  |--------------------------------------------------------------------------
  |
  | Here we define configuration for mailgun. Extra options can be defined
  | inside the `extra` object.
  |
  | https://mailgun-documentation.readthedocs.io/en/latest/api-sending.html#sending
  |
  | extras: {
  |   'o:tag': '',
  |   'o:campaign': '',,
  |   . . .
  | }
  |
  */
    mailgun: {
        driver: 'mailgun',
        domain: Env.get('MAILGUN_DOMAIN'),
        region: Env.get('MAILGUN_API_REGION'),
        apiKey: Env.get('MAILGUN_API_KEY'),
        extras: {
        },
    },

    /*
  |--------------------------------------------------------------------------
  | Ethereal
  |--------------------------------------------------------------------------
  |
  | Ethereal driver to quickly test emails in your browser. A disposable
  | account is created automatically for you.
  |
  | https://ethereal.email
  |
  */
    ethereal: {
        driver: 'ethereal',
    },
};

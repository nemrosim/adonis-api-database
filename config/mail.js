'use strict';

const Env = use('Env');

// adonis-api-database@ukr.net
// Adonis!API_234-database-smtp
// j0d3TwW0xFsDLdHH

module.exports = {
    connection: Env.get('MAIL_CONNECTION'),
    smtp: {
        driver: 'smtp',
        pool: true,
        port: Env.get('SMTP_PORT'),
        host: Env.get('SMTP_HOST'),
        secure: true,
        auth: {
            user: Env.get('MAIL_USERNAME'),
            pass: Env.get('MAIL_PASSWORD'),
        },
        maxConnections: 5,
        maxMessages: 100,
        rateLimit: 10,
    },

    sparkpost: {
        driver: 'sparkpost',
        apiKey: Env.get('SPARKPOST_API_KEY'),
        extras: {
        },
    },

    mailgun: {
        driver: 'mailgun',
        domain: Env.get('MAILGUN_DOMAIN'),
        region: Env.get('MAILGUN_API_REGION'),
        apiKey: Env.get('MAILGUN_API_KEY'),
        extras: {
        },
    },

    ethereal: {
        driver: 'ethereal',
    },
};

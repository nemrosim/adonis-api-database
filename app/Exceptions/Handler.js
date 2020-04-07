'use strict';

const BaseExceptionHandler = use('BaseExceptionHandler');
const Logger = use('Logger');

const ERROR_CODES = {
    E_PASSWORD_MISMATCH: 'E_PASSWORD_MISMATCH',
    E_INVALID_JWT_TOKEN: 'E_INVALID_JWT_TOKEN',
    E_INVALID_MIDDLEWARE_TYPE: 'E_INVALID_MIDDLEWARE_TYPE',
    E_MISSING_NAMED_MIDDLEWARE: 'E_MISSING_NAMED_MIDDLEWARE',
    E_USER_NOT_FOUND: 'E_USER_NOT_FOUND',
};

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
    /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
    async handle (error, { request, response }) {
        Logger.error('ERROR \nStatus:%s \nName:%s \nMessage:%s \nCode:%s \nHost:%s \nURL:%s',
            error.status,
            error.name,
            error.message,
            error.code,
            request.header('host'),
            request.url());
        //
        // host: request.header('host'),
        //   url: request.url(),
        //   originalUrl: request.originalUrl(),
        //   method: request.method(),
        //   intended: request.intended(),
        //   ip: request.ip(),
        //   subdomains: request.subdomains(),
        //   'user-agent': request.header('user-agent'),
        //   accept: request.header('accept'),
        //   hello: request.header('hello'),
        //   isAjax: request.ajax(),
        //   hostname: request.hostname(),
        //   protocol: request.protocol(),

        switch (error.code) {
        case ERROR_CODES.E_PASSWORD_MISMATCH:
            response.status(error.status)
                .send({
                    error: 'Wrong password',
                });
            break;
        case ERROR_CODES.E_USER_NOT_FOUND: {
            response.status(error.status)
                .send({
                    error: error.message.split(':')[1].trim(),
                });
            break;
        }
        case ERROR_CODES.E_MISSING_NAMED_MIDDLEWARE: {
            const message = error.message.split(':')[1].split('>')[0].trim();

            response.status(error.status)
                .send({
                    error: {
                        code: error.code,
                        message,
                    },
                });
            break;
        }
        case ERROR_CODES.E_INVALID_JWT_TOKEN:
            response.status(error.status)
                .send({
                    error: error.message,
                });
            break;
        case ERROR_CODES.E_INVALID_MIDDLEWARE_TYPE: {
            const message = error.message.split(':')[1].split('>')[0].trim();
            Logger.notice('MESSAGE %s', message);
            response.status(error.status)
                .send({
                    error: {
                        code: error.code,
                        message,
                    },
                });
        }
            break;
        default:
            response.status(error.status)
                .send(error.message);
            break;
        }
    }

    /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
    async report (error, { request }) {
    }
}

module.exports = ExceptionHandler;

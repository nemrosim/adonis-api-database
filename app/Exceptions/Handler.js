'use strict';

const BaseExceptionHandler = use('BaseExceptionHandler');
const Logger = use('Logger');

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

        if (error.code === 'E_PASSWORD_MISMATCH') {
            response.status(error.status)
                .send({
                    error: 'Wrong password',
                });
        } else if (error.code === 'E_INVALID_JWT_TOKEN') {
            response.status(error.status)
                .send({
                    error: error.message,
                });
        } else {
            response.status(error.status)
                .send(error.message);
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

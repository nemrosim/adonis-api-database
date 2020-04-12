
const Route = use('Route');
const { ROUTES, CONTROLLERS } = require('../../constants');

Route
    .group(() => {
        Route
            .resource(ROUTES.SERVER, CONTROLLERS.SERVER)
            .apiOnly();
    })
    .prefix('api/v1/');

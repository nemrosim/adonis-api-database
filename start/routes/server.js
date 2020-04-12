
const Route = use('Route');
const { ROUTES, CONTROLLERS } = require('../../constants');

Route
    .group(() => {
        Route
            .get(ROUTES.SERVER, `${CONTROLLERS.SERVER}.serverCheck`)
            .formats(['json']);
    })
    .prefix('api/v1/');

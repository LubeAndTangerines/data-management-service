const healthController = require('./controllers/healthController');

function registerAppRoutes(app) {
    // GET Healthcheck
    app.route(`/api/v1/healthcheck`).get(healthController);
}

module.exports = {
    registerAppRoutes
};

const healthController = require('./controllers/healthController');
const wishesController = require('./controllers/wishesController');


function registerAppRoutes(app) {
    // GET Healthcheck
    app.route(`/api/v1/healthcheck`).get(healthController);

    // Wishes

    // GET - Get pile of wishes ?status={validated/requested/uploaded/rejected}
    app.route(`/api/v1/piles/:pile_id/wishes`).get(wishesController.getWishes);
    // POST - Add new wish to pile
    app.route(`/api/v1/piles/:pile_id/wishes`).post(wishesController.postNewWishes);
    // PATCH - Change wish in a pile
    app.route(`/api/v1/piles/:pile_id/wishes`).patch(wishesController.patchWish);
}

module.exports = {
    registerAppRoutes
};

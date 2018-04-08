const healthController = require('./controllers/healthController');
const wishesController = require('./controllers/wishesController');
const pilesController = require('./controllers/pilesController');


function registerAppRoutes(app) {
	// Health Check

	// GET Healthcheck
	app.route('/api/v1/healthcheck').get(healthController);


	// Wishes

	// GET - Get pile of wishes ?status={validated/requested/uploaded/rejected}
	app.route('/api/v1/piles/:pile_id/wishes').get(wishesController.getWishes);
	// POST - Add new wish to pile
	app.route('/api/v1/piles/:pile_id/wishes').post(wishesController.postNewWishes);
	// PATCH - Change wish in a pile
	app.route('/api/v1/piles/:pile_id/wishes').patch(wishesController.patchWish);


	// Wishpiles

	// GET - Get wishpile by ID
	app.route('/api/v1/piles/:pile_id').get(pilesController.getPile);
	// POST - Create new wishpile
	app.route('/api/v1/piles').post(pilesController.postNewPile);
	// PUT - Change wishpiles description or name
	app.route('/api/v1/piles/:pile_id').put(pilesController.putPile);
}

module.exports = {
	registerAppRoutes,
};

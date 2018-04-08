const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const handler = require('./middleware/responseHandler');
const requestId = require('./middleware/requestUuid');
const logger = require('./helpers/logger');
const registerAppRoutes = require('./routes').registerAppRoutes;

const app = express();
const migration = require('./models/migration');


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(requestId);
app.use(handler.response);
registerAppRoutes(app);
app.use(handler.error);

/*
 * Migrate database and run application or exit with error
 */
migration()
	.then(() => {
		logger.log('debug', 'Migrations complete.');

		const startMsg = `${process.env.npm_package_name} service started on port ${config.service.port}.`;

		app.listen(config.service.port, () => logger.log('info', startMsg));
	})
	.catch((err) => {
		logger.log('alert', 'Failed to run migrations!', err);
		process.exit(1);
	});

module.exports = { app };

const db = require('../helpers/postgres').db;
const logger = require('../helpers/logger');
/*
 * Healthcheck controller
 * Purpose: Check application services health
 * Health can be checked via predefined (GET) route "/healthcheck"
 */

// Get check payload
function testPayload(name, statusObj) {
	return { name, status: statusObj };
}

function testPostgres() {
	const check = 'postgres';
	return new Promise((resolve, reject) => {
		db.connect()
			.then((obj) => {
				obj.done();
				resolve(testPayload(check, {
					resolved: true,
				}));
			})
			.catch(error => resolve(testPayload(check, error)));
	});
}

function healthController(req, res) {
	const statusBody = {
		status: 200,
		service: process.env.npm_package_name,
		statusMessage: 'OK. Service is running!',
		reqID: req.rid,
	};

	new Promise((resolve, reject) => {
		const serviceChecks = [
			testPostgres(),
		];

		Promise.all(serviceChecks)
			.then((results, status) => {
				results.forEach((check) => {
					statusBody[check.name] = check.status;
				});

				resolve(statusBody);
			})
			.catch(errors => logger.log('error', 'Errors while checking service status', errors));
	})
		.then(result => res.status(result.status).json(result));
}

module.exports = healthController;

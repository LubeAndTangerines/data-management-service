const config = require('config').db;
const pgPromise = require('pg-promise');
const logger = require('./logger');
/*
 * Exports pg-promise with connection-string
 */

function buildDatabaseConnectionString() {
	let connStr = 'postgres://';
	connStr += `${config.user}:`;
	connStr += `${config.password}@`;
	connStr += `${config.host}:`;
	connStr += `${config.port}/`;
	connStr += config.db;

	return connStr;
}

const options = {
	error: (err, e) => {
		if (e.cn) {
			logger.log('alert', 'Postgres cannot connect to DB', {
				address: err.address,
				port: err.port,
				code: err.code,
			});
		}
	},
	transact(e) {
		if (e.ctx.finish) {
			// statsD.timing('transaction' + e.ctx.duration)
		}
	},
};


const pgp = pgPromise(options);
const db = pgp(buildDatabaseConnectionString());

module.exports = { pgp, db };

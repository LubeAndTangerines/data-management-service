const db = require('../helpers/postgres').db;
const logger = require('../helpers/logger');
const sql = require('./sql/sql');

function getPileByPileId(pileId, statuses, rid) {
	return new Promise((resolve, reject) => {
		const queryParams = {
			link: pileId,
		};

		db.one(sql.getPile, queryParams)
			.then(pile => resolve(pile))
			.catch((err) => {
				logger.log('info', 'No such pile found', { err: err.message, rid });
				reject(err);
			});
	});
}

function addPile(params, rid) {
	return new Promise((resolve, reject) => {
		const queryParams = {
			rid: rid,
			name: params.name || 'My List',
			description: params.description || null,
			link: rid,
		};

		db.tx(t => t.oneOrNone(sql.addNewPile, queryParams, () => t.one(sql.getLastAddedPile)))
			.then(pile => resolve(pile))
			.catch((err) => {
				logger.log('alert', 'Error while inserting new wish', { err: err.message, rid });
				reject(err);
			});
	});
}

function changePile(pileId, params, rid) {
	return new Promise((resolve, reject) => {
		const queryParams = {
			pileId: pileId,
			name: params.name,
			description: params.description,
		};

		db.tx(t => t.oneOrNone(sql.updatePile, queryParams, () => t.one(sql.getPile, queryParams)))
			.then(pile => resolve(pile))
			.catch((err) => {
				logger.log('alert', 'Error while updating pile', { err: err.message, rid });
				reject(err);
			});
	});
}

module.exports = {
	getPileByPileId,
	addPile,
	changePile,
};
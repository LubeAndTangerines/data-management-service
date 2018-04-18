const errorHandler = require('../helpers/errorHandlers');
const validator = require('../helpers/swaggerValidator');
const constants = require('../constants');
const logger = require('../helpers/logger');
const wishesModel = require('../models/wishesModel');
const helpers = require('../helpers/functions');

function getWishes(req, res, next) {
	const pileId = req.params.pile_id;
	const statuses = req.query.status ? helpers.getQueryParamAsUpperArray(req.query.status) : Object.values(constants.STATUSES);

	return wishesModel.getWishesByStatusAndPileId(pileId, statuses, req.rid)
		.then((results) => {
			if (results.length === 0) {
				return req.response(404, 'no wishes found', {
					resultCount: results.length,
					result: results,
				});
			}

			return req.response(200, 'wishes', {
				resultCount: results.length,
				result: results,
			});
		})
		.catch(err => next(new errorHandler.Request(err.message, 'failed to get wishes')));
}

function postNewWishes(req, res, next) {
	const payload = req.body;
	const validation = validator.validate('AddWishesModel', payload);
	const pileId = req.params.pile_id;

	if (validation.valid === false) {
		logger.log('warn', 'PayloadValidation failed on post new Wish', {
			rid: req.rid,
			validationMsg: validation.GetErrorMessages(),
		});
		return next(new errorHandler.Validation({ errors: validation.GetErrorMessages() }));
	}

	return wishesModel.addWishesToPile(pileId, payload, req.rid)
		.then(data => req.response(201, 'wishes added', data))
		.catch(err => next(new errorHandler.System(err.message, 'failed to add new wishes')));
}

function patchWish(req, res, next) {
	const payload = req.body;
	const validation = validator.validate('UpdateWishesModel', payload);
	const pileId = req.params.pile_id;

	if (validation.valid === false) {
		logger.log('warn', 'PayloadValidation failed on wish update', {
			rid: req.rid,
			validationMsg: validation.GetErrorMessages(),
		});
		return next(new errorHandler.Validation({ errors: validation.GetErrorMessages() }));
	}

	return wishesModel.changeWish(payload, req.rid)
		.then(req.response(200, 'updated'))
		.catch((err) => {
			logger.log('error', 'Update failed on some wishes', {
				rid: req.rid,
				pileId: pileId,
				payload: payload,
				msg: err.message,
			});

			return next(new errorHandler.Request(err.message, 'update failed'));
		});
}

module.exports = {
	getWishes,
	postNewWishes,
	patchWish,
};

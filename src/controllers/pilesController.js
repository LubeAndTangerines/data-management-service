const errorHandler = require('../helpers/errorHandlers');
const validator = require('../helpers/swaggerValidator');
const logger = require('../helpers/logger');
const pilesModel = require('../models/pilesModel');

function getPile(req, res, next) {
	const pileId = req.params.pile_id;

	return pilesModel.getPileByPileId(pileId, req.rid)
		.then(result => req.response(200, 'Pile', {
			result: result,
		}))
		.catch((err) => {
			if (err.message === 'No data returned from the query.') {
				return req.response(404, 'No such pile found');
			}
			return next(new errorHandler.Request(err.message, 'failed_to_get_pile'));
		});
}

function postNewPile(req, res, next) {
	const payload = req.body;

	return pilesModel.addPile(payload, req.rid)
		.then(data => req.response(201, 'Pile added', data))
		.catch(err => next(new errorHandler.System(err.message, 'Failed to add new Pile')));
}

function putPile(req, res, next) {
	const payload = req.body;
	const validation = validator.validate('PileModel', payload);
	const pileId = req.params.pile_id;

	if (validation.valid === false) {
		logger.log('warn', 'PayloadValidation failed on pile update', {
			rid: req.rid,
			validationMsg: validation.GetErrorMessages(),
		});
		return next(new errorHandler.Validation({ errors: validation.GetErrorMessages() }));
	}

	return pilesModel.changePile(pileId, payload, req.rid)
		.then(result => req.response(200, 'Pile updated', result))
		.catch((err) => {
			logger.log('error', 'Update failed on Pile', {
				rid: req.rid,
				pileId: pileId,
				payload: payload,
				msg: err.message,
			});

			return next(new errorHandler.Request(err.message, 'update_failed'));
		});
}

module.exports = {
	getPile,
	postNewPile,
	putPile,
};

const errorHandler = require('../helpers/errorHandlers');
const validator = require('../helpers/swaggerValidator');
const constants = require('../constants');
const logger = require('../helpers/logger');
const wishesModel = require('../models/wishesModel');
const helpers = require('../helpers/functions');

const STATUSES = {
    wished: 'WISHED',
    granted: 'GRANTED',
    forgotten: 'FORGOTTEN',
};

function getWishes(req, res, next) {
    let statuses = STATUSES;
    if (req.query.status) {
        statuses = helpers.getQueryParamAsUpperArray(req.query.status);
    }
    const queryParams = {
        statuses,
        pile_id: parseInt(req.query.pile, 10),
    };

    return wishesModel.getWishesByStatusAndPileId(queryParams, req.rid)
        .then((results) => {
            req.response(200, 'success', {
                resultCount: results.length,
                result: results,
            });
        })
        .catch(err => next(new errorHandler.Request(err.message, 'failed_to_get_wishes')));
}

function postNewWishes(req, res, next) {
    const payload = req.body;
    const validation = validator.validate('WishesModel', payload);
    const pileId = req.params.pile_id;

    if (validation.valid === false) {
        logger.log('warn', 'PayloadValidation failed on post new Wish', {
            rid: req.rid,
            validationMsg: validation.GetErrorMessages(),
        });

        return next(new errorHandler.Validation({ errors: validation.GetErrorMessages() }));
    }

    return wishesModel.addWish(pileId, payload.wishes, req.rid)
        .then(data => req.response(200, 'Wishes added', data))
        .catch(err => next(new errorHandler.System(err.message, 'Failed to add new wishes')));
}

function patchWish(req, res, next) {
    const payload = req.body;
    const validation = validator.validate('WishUpdateModel', payload);

    if (validation.valid === false) {
        logger.log('warn', 'PayloadValidation failed on update', {
            rid: req.rid,
            valdiationMsg: validation.GetErrorMessages(),
        });

        return next(new errorHandler.Validation({ errors: validation.GetErrorMessages() }));
    }

    const pileId = req.params.pile_id;
    const newStatus = constants.STATUSES[payload.status];

    return wishesModel.changeWish(pileId, newStatus, req.rid)
        .then(result => req.response(200, 'updated', result))
        .catch((err) => {
            logger.log('error', 'Update failed on some wishes', {
                rid: req.rid,
                pile_id:,
                newStatus,
                msg: err.message,
            });

            return next(new errorHandler.Request(err.message, 'update_failed'));
        });
}

module.exports = {
    getWishes,
    postNewWishes,
    patchWish,
};

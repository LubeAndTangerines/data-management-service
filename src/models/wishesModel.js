const db = require('../helpers/postgres').db;
const logger = require('../helpers/logger');
const constants = require('../constants');
const sql = require('./sql/sql');

function getWishesByStatusAndPileId(pileId, statuses, rid) {
    return new Promise((resolve, reject) => {
        const queryParams = {
            pileId: pileId,
            statuses: statuses,
        };

        db.any(sql.getWishes, queryParams)
            .then(wishes => resolve(wishes))
            .catch((err) => {
                logger.log('info', 'No wishes found', { err: err.message, rid });
                reject(err);
            });
    });
}

function addWishToPile(pileId, params, rid) {
    return new Promise((resolve, reject) => {
        db.tx((t) => {
            params.wishes.forEach(newWish => t.any(sql.addNewWish, {
                pileId: pileId,
                rid: rid,
                wish: newWish.description,
                amount: newWish.amount || 1,
            }));
        })
            .then(wishes => resolve(wishes))
            .catch((err) => {
                logger.log('alert', 'Error while inserting new wish', { err: err.message, rid });
                reject(err);
            });
    });
}

function changeWish(params, rid) {
    return new Promise((resolve, reject) => {
        db.tx((t) => {
            const wishes = params.wishes;
            switch (params.updateField) {
                case "status":
                    wishes.forEach(wish => t.none(sql.updateWishStatus, {
                        newStatus: constants.STATUSES[wish.status],
                        wishId: wish.id,
                    }).then(wishes => resolve(wishes)).catch((err) => reject(err)));
                    break;
                case "amount":
                    wishes.forEach(wish => t.none(sql.updateWishAmount, {
                        newAmount: wish.amount,
                        wishId: wish.id,
                    }).then(resolve).catch((err) => reject(err)));
                    break;
                case "description":
                    wishes.forEach(wish => t.none(sql.updateWish, {
                        newWish: wish.description,
                        wishId: wish.id,
                    }).then(resolve).catch((err) => reject(err)));
                    break;
            }
        })
            .then(wishes => resolve(wishes))
            .catch((err) => {
                logger.log('error', 'Error while updating wishes', { err: err.message, rid });
                reject(err);
            });
    });
}

module.exports = {
    getWishesByStatusAndPileId,
    addWishToPile,
    changeWish,
};
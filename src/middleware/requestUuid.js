const UID = require('lodash-uuid');

/*
 * Add request UID to all requests.
 */

function requestUuid(req, res, next) {
	req.rid = UID.uuid();
	next();
}

module.exports = requestUuid;

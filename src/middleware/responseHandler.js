const logger = require('../helpers/logger');

/*
 * ErrorHandler middleware. If no response is sent return error
 */

function errorHandler(err, req, res, next) {
	logger.log('debug', err.message, { data: err.data, statusCode: err.status, rid: req.rid });

	return res.status(err.status || 500).json({
		status: err.status,
		message: err.message,
		data: err.data,
	});
}

function requestResponse(req, res, next) {
	req.response = (statusCode, message, data) => {
		logger.log('debug', message, { rid: req.rid, data, statusCode });

		return res.status(statusCode).json({
			status: statusCode,
			message: message,
			data,
		});
	};
	next();
}

module.exports = {
	response: requestResponse,
	error: errorHandler,
};

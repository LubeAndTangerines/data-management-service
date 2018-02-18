const config = require('config');
const winston = require('winston');
const _ = require('lodash');

// Logging levels:
// alert: 0 - Should be corrected immediately, notify staff who can fix the problem.
// error: 1 - Non-urgent failures, each item must be resolved within a given time.
// info: 2 - Normal operational messages, no action required.
// debug: 3 - Info useful to developers for debugging the app, not useful during operations.

// Verbosity settings:
// 1: Logs default keys - (rid, message, cacheKey)
// 2: Logs default keys plus keys specified in the whitelist
// 3: Logs everything

// whitelist is added as the optional last argument in the log function
// ex. logger.log('info', 'Important info log', {data: payload}, ['client.address', 'url'])

const blacklistLoggingMsgByVerbosity = {
	1: ['Postgres'],
};

function filterExtraDataByVerbosity(meta, verbosity, whitelist) {
	const defaultWhitelist = ['rid', 'cacheKey', 'error'];

	if (meta && verbosity === 1) {
		return _.pick(meta, defaultWhitelist);
	}
	else if (meta && verbosity === 2) {
		return whitelist ? _.pick(meta, whitelist.concat(defaultWhitelist)) : _.pick(meta, whitelist);
	}
	return meta;

}

const transports = [
	new winston.transports.File({
		silent: (!config.logger.file.enabled),
		level: config.logger.file.level,
		filename: config.logger.file.path,
	}),
	new winston.transports.Console({
		silent: (!config.logger.console.enabled),
		level: config.logger.console.level,
		handleExceptions: true,
		humanReadableUnhandledException: true,
	}),
];


class Logger {
	constructor() {
		this.winstonLogger = new (winston.Logger)({
			transports: transports,
			levels: winston.config.syslog.levels,
		});
	}

	log(level, msg, meta, whitelist = [], callback) {
		const verbosity = config.logger.verbosity;
		if (_.includes(blacklistLoggingMsgByVerbosity[verbosity], msg)) {
			if (callback) {
				callback(new Error(`Logging with message ${msg} disabled!`));
				return;
			}
		}
		this.winstonLogger.log(level, msg, filterExtraDataByVerbosity(meta, verbosity, whitelist));
	}
}

const logger = new Logger();

module.exports = logger;
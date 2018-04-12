const config = require('config');

const portocol = 'http';
const hostname = 'localhost';
const port = config.service.port;

const API_PATH = `${portocol}://${hostname}:${port}/api/v1`;

module.exports = API_PATH;
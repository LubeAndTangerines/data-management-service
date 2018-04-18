/* eslint-disable no-undef */

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const constants = require('../../src/constants');
// const describe = require('mocha');
// const it = require('mocha');

const assert = chai.assert;
const API_PATH = require('../helpers/config');

chai.use(chaiHttp);

const api = chai.request(API_PATH);

module.exports = (globals) => {
	describe(`GET - /piles/${globals.link}/wishes`, () => {
		const apiEndpoint = `/piles/${globals.link}/wishes`;

		it('successful should return status', () => api.get(`${apiEndpoint}?status=${constants.STATUSES.wished}`)
			.then((res) => {
				assert.equal(res.status, 200);
				assert.equal(res.body.message, 'wishes');
			}));

		it('no wish status should return all statuses', () => api.get(apiEndpoint)
			.then((res) => {
				assert.equal(res.status, 200);
				assert.equal(res.body.message, 'wishes');
			}));

		// it('no wishes should return 404', () => api.get(`${apiEndpoint}?status=${constants.STATUSES.checked}`)
		// 	.then((res) => {
		// 		assert.equal(res.status, 404);
		// 		assert.equal(res.body.message, 'no wishes found');
		// 		assert.equal(res.body.data.resultCount, 0);
		// 		assert.equal(res.body.data.resultCount, []);
		// 	}));
	});
};

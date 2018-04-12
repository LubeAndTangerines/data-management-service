/* eslint-disable no-undef */

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
// const describe = require('mocha');
// const it = require('mocha');

const assert = chai.assert;
const API_PATH = require('../helpers/config');

chai.use(chaiHttp);

const api = chai.request(API_PATH);

module.exports = (globals, testParams) => {
	describe(`GET - /piles/${globals.link}/wishes?status=wished`, () => {
		const apiEndpoint = `/piles/${globals.link}/wishes?status=wished`;

		it(`get wishes status should equal ${testParams.testStatus}`, () => api.get(apiEndpoint)
			.then((res) => {
				assert.equal(res.status, 200);
				assert.equal(res.body.message, 'wishes');
			}));
	});
};

/* eslint-disable no-undef */

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const assert = chai.assert;
const API_PATH = require('../helpers/config');

chai.use(chaiHttp);

const api = chai.request(API_PATH);

module.exports = (globals) => {
	describe(`POST - /piles/${globals.link}/wishes`, () => {
		const apiEndpoint = `/piles/${globals.link}/wishes`;
		const data = {};

		it('should return status 201', () => {
			data.request = {
				wishes: [
					{ description: 'Bacon' },
					{ description: 'Eggs', amount: 2 },
					{ description: 'Beer', amount: 4 },
				],
			};

			return api.post(apiEndpoint)
				.send(data.request)
				.then((res) => {
					assert.equal(res.status, 201);
					assert.equal(res.body.message, 'Wishes added');
				});
		});

		it('empty required fields/ should return status 400', () => {
			data.request = {
				wishes: [],
			};
			return api.post(apiEndpoint)
				.send(data.request)
				.catch((err) => {
					assert.equal(err.response.status, 400);
					assert.equal(err.response.body.message, 'Error when validating data');
					const responseErrors = err.response.body.data.errors;
					Object.keys(data.request).forEach((element, i) => {
						assert.equal(responseErrors[i], `expected to have at least one wish`);
					});
				});
		});

		it('empty payload/ should return status 400', () => api.post(apiEndpoint)
			.send(data)
			.catch((err) => {
				assert.equal(err.response.body.status, 400);
				assert.equal(err.response.body.message, 'Error when validating data');
				const responseErrors = err.response.body.data.errors;
				const requiredFields = ['wishes'];
				requiredFields.forEach((element, i) => {
					assert.equal(responseErrors[i], `${element} is a required field`);
				});
			}));
	});
};
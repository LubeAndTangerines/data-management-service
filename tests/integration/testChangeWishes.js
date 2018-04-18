/* eslint-disable no-undef */

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const assert = chai.assert;
const API_PATH = require('../helpers/config');

chai.use(chaiHttp);

const api = chai.request(API_PATH);

module.exports = (globals) => {
	describe(`PATCH - /piles/${globals.link}/wishes`, () => {
		const apiEndpoint = `/piles/${globals.link}/wishes`;
		const data = {};

		it('change wishes description should return status 200', () => {
			data.request = {
				updateField: 'description',
				wishes: [
					{ id: 1, description: 'Froggo' },
					{ id: 2, description: 'Peet' },
				],
			};

			return api.patch(apiEndpoint)
				.send(data.request)
				.then((res) => {
					assert.equal(res.status, 200);
					assert.equal(res.body.message, 'updated');
				});
		});

		it('change wishes amount should return status 200', () => {
			data.request = {
				updateField: 'amount',
				wishes: [
					{ id: 1, amount: 2 },
					{ id: 2, amount: 4 },
				],
			};

			return api.patch(apiEndpoint)
				.send(data.request)
				.then((res) => {
					assert.equal(res.status, 200);
					assert.equal(res.body.message, 'updated');
				});
		});

		it('change wishes description should return status 200', () => {
			data.request = {
				updateField: 'status',
				wishes: [
					{ id: 1, status: 'wished' },
					{ id: 2, status: 'archived' },
				],
			};

			return api.patch(apiEndpoint)
				.send(data.request)
				.then((res) => {
					assert.equal(res.status, 200);
					assert.equal(res.body.message, 'updated');
				});
		});

		it('empty/wrong required fields should return status 400', () => {
			data.request = {
				updateField: 'potato',
				wishes: [],
			};
			return api.patch(apiEndpoint)
				.send(data.request)
				.catch((err) => {
					assert.equal(err.response.status, 400);
					assert.equal(err.response.body.message, 'Error when validating data');
					const responseErrors = err.response.body.data.errors;
					const expectedErrors = [
						'status potato not allowed',
						'expected to have at least one wish',
					];
					Object.keys(data.request).forEach((element, i) => {
						assert.equal(responseErrors[i], expectedErrors[i]);
					});
				});
		});

		it('empty payload should return status 400', () => api.patch(apiEndpoint)
			.send(data)
			.catch((err) => {
				assert.equal(err.response.status, 400);
				assert.equal(err.response.body.message, 'Error when validating data');

				const responseErrors = err.response.body.data.errors;
				const requiredFields = ['updateField', 'wishes'];
				requiredFields.forEach((element, i) => {
					assert.equal(responseErrors[i], `${element} is a required field`);
				});
			}));
	});
};
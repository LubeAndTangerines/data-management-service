/* eslint-disable no-undef */

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const assert = chai.assert;
const API_PATH = require('../helpers/config');

chai.use(chaiHttp);

const api = chai.request(API_PATH);

module.exports = (globals) => {
	describe(`PUT - /piles/${globals.link}/wishes`, () => {
		const apiEndpoint = `/piles/${globals.link}/wishes`;
		const data = {};

		const config = {};

		it('validate documents should return status 200', () => {
			data.request = {
				updateField: 'status',
				wishes: [
					{ id: 1, status: 'checked' },
					{ id: 2, status: 'archived' },
				],
			};

			return api.put(apiEndpoint)
				.send(data.request)
				.then((res) => {
					assert.equal(res.status, 200);
					assert.equal(res.body.message, 'updated');
					const responseDocs = res.body.data;
					Object.keys(config.validate).forEach((element, i) => {
						assert.equal(responseDocs.indexOf(element) !== -1, true);
					});
				});
		});

		it('empty required fields/ should return status 404', () => {
			data.request = {
				admin: '',
				documents: '',
			};

			return api.put(apiEndpoint)
				.send(data.request)
				.catch((err) => {
					assert.equal(err.response.status, 404);
					assert.equal(err.response.body.message, 'Error when validating data');

					const requiredFields = ['updateField', 'wishes'];
					requiredFields.forEach((element, i) => {
						assert.equal(err.response.body.data.errors[i], `${element} is a required field`);
					});
				});
		});

		it('empty payload/ should return status 404', () => api.put(apiEndpoint)
			.send(data)
			.catch((err) => {
				assert.equal(err.response.status, 404);
				assert.equal(err.response.body.message, 'Error when validating data');

				const responseErrors = err.response.body.data.errors;
				const requiredFields = ['updateField', 'wishes'];
				requiredFields.forEach((element, i) => {
					assert.equal(responseErrors[i], `${element} is a required field`);
				});
			}));
	});
};
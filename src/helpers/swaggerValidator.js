const fs = require('fs');
const Validator = require('swagger-model-validator');
const constants = require('../constants');

const swaggerModel = JSON.parse(fs.readFileSync('public/swagger.json'));
const validator = new Validator(swaggerModel);

// Verify that at least some wishes are sent for adding to pile
validator.addFieldValidator('AddWishesModel', 'wishes', (name, value) => {
	const errors = [];

	if (Object.keys(value).length === 0) errors.push(new Error('expected to have at least one wish'));
	return errors.length > 0 ? errors : null;
});

// Verify that only allowed updateFields can be set while changing wishes
validator.addFieldValidator('UpdateWishesModel', 'updateField', (name, value) => {
	const errors = [];

	if (!constants.UPDATE_FIELDS[value]) errors.push(new Error(`status ${value} not allowed`));
	return errors.length > 0 ? errors : null;
});

// Verify that at least some wishes are sent for changing in pile
validator.addFieldValidator('UpdateWishesModel', 'wishes', (name, value) => {
	const errors = [];

	if (Object.keys(value).length === 0) errors.push(new Error('expected to have at least one wish'));
	return errors.length > 0 ? errors : null;
});

function validate(model, body) {
	const disallowExtraProps = true;
	const allowBlankTarget = true;

	return validator.swagger.validateModel(model, body, allowBlankTarget, disallowExtraProps);
}

module.exports = {
	validate,
	validator,
};

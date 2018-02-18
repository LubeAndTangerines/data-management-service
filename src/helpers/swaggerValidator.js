const Validator = require('swagger-model-validator');

const swaggerModel = JSON.parse(fs.readFileSync('public/swagger.json'));
const validator = new Validator(swaggerModel);

function validate(model, body) {
	const disallowExtraProps = true;
	const allowBlankTarget = true;

	return validator.swagger.validateModel(model, body, allowBlankTarget, disallowExtraProps);
}

module.exports = {
	validate,
	validator,
};

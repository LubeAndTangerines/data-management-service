function getQueryParamAsUpperArray(param) {
	if (typeof param === 'string') {
		return [param.toUpperCase()];
	}
	return param.map(st => st.toUpperCase());
}

module.exports = {
	getQueryParamAsUpperArray,
};
/* eslint-disable filenames/no-index,global-require,import/no-dynamic-require */
/*
	Order should be always the following:
	1. add
	2. change
	3. get <-- actually can be anywhere
*/

// Provide parameters for tests here
const globals = {
	link: 'bda9d731-e736-4ab4-90fe-03aa7f46408c',
};

// Tests will be executed with this order
const tests = [
	{ src: './testAddWishes' },
	{ src: './testChangeWishes' },
	{ src: './testGetWishes' },
];

// Just a simple hack to execute all tests
tests.forEach(test => require(test.src)(globals, test.params || {}));

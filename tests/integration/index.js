/* eslint-disable filenames/no-index,global-require,import/no-dynamic-require */
/*
	Order should be always the following:
	1. add
	2. get
	3. change
	4. get <-- actually can be anywhere but if validating the status and it should end up with rejected/validated if runned as last one
*/

// Provide parameters for tests here :)
// Can insert anything and use it all over the tests
// 4 example all test will be runned with random clientId

const globals = {
	link: 'de9e7624-4bc3-44df-b4c2-de97e400becb',
};

// Tests will be executed with this order
const tests = [
	{ src: './testAddWishes' },
	{ src: './testChangeWishes' },
	{ src: './testGetWishes', params: { testStatus: 'wished' } },
];

// Just a simple hack to execute all tests
tests.forEach(test => require(test.src)(globals, test.params || {}));

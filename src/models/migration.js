const QueryFile = require('pg-promise').QueryFile;
const path = require('path');
const db = require('../helpers/postgres').db;

const initialSQL = new QueryFile(path.join(__dirname, './sql/migration/initial.sql'));

function migration() {
	return db.none(initialSQL);
}

module.exports = migration;
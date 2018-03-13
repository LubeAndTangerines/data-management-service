const path = require('path');
const QueryFile = require('pg-promise').QueryFile;

const queries = {
    // Wishes
    getWishes: new QueryFile(path.join(__dirname, './wishes/getWishes.sql')),
    addNewWish: new QueryFile(path.join(__dirname, './wishes/addNewWish.sql')),
    updateWish: new QueryFile(path.join(__dirname, './wishes/updateWishDescription.sql')),
    updateWishStatus: new QueryFile(path.join(__dirname, './wishes/updateWishStatus.sql')),
    updateWishAmount: new QueryFile(path.join(__dirname, './wishes/updateWishAmount.sql')),
};

module.exports = queries;
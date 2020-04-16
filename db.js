const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Default db.json
db.defaults({users: []}).write();
db.defaults({products: []}).write();

module.exports = db;
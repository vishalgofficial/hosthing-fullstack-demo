// Hosthing supplies the connection URL through its secure service binding.
const connection = process.env.DATABASE_URL;
if (connection) {
    const url = new URL(connection);
    if (url.protocol !== 'mysql:') throw new Error('This demo requires a MySQL database');
    process.env.MYSQL_HOST = url.hostname;
    process.env.MYSQL_USER = decodeURIComponent(url.username);
    process.env.MYSQL_PASSWORD = decodeURIComponent(url.password);
    process.env.MYSQL_DB = decodeURIComponent(url.pathname.slice(1));
}
if (process.env.MYSQL_HOST) module.exports = require('./mysql');
else module.exports = require('./sqlite');

const redis = require("redis-typescript");

const connection = redis({ host: "localhost" });

module.exports = connection;

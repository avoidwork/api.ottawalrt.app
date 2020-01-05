"use strict";

const path = require("path"),
	tenso = require("tenso"),
	config = require(path.join(__dirname, "config.json")),
	routes = require(path.join(__dirname, "lib", "routes.js"));

if (process.env.NODE_ENV === "production") {
	config.silent = true;
	config.dtrace = false;
}

config.routes = routes;
config.security.secret = process.env.OLRT_SECURITY_SECRET;
config.session.secret = process.env.OLRT_SESSION_SECRET;
config.session.redis.host = process.env.OLRT_SESSION_REDIS_HOST;

if ("OLRT_CORS_ORIGINS" in process.env) {
	const env = process.env.OLRT_CORS_ORIGINS;

	config.origins = env.length > 0 ? env.split(",") : [];
}

if ("OLRT_SEED" in process.env) {
	config.seed = parseInt(process.env.OLRT_SEED, 10);
}

if ("OLRT_SESSION_REDIS_PORT" in process.env) {
	config.session.redis.port = parseInt(process.env.OLRT_SESSION_REDIS_PORT, 10);
}

const app = tenso(config);

module.exports = app.start();

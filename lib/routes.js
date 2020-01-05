"use strict";

const path = require("path"),
	alerts = require(path.join(__dirname, "alerts.js")),
	status = require(path.join(__dirname, "status.js")),
	stops = require(path.join(__dirname, "stops.js")),
	{filter} = require(path.join(__dirname, "middleware.js"));

const routes = {
	"always": {
		"/.*": filter
	},
	"get": {
		"/": ["api"],
		"/api": ["alerts", "status", "stops"],
		"/api/alerts": async (req, res) => res.send(await alerts()),
		"/api/status": async (req, res) => res.send(await status()),
		"/api/stops": stops
	}
};

(async function () { await status(); }());
module.exports = routes;

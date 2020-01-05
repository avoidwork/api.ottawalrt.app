"use strict";

const path = require("path"),
	error = require(path.join(__dirname, "error.js")),
	cache = require(path.join(__dirname, "cache.js")),
	clone = require(path.join(__dirname, "clone.js")),
	log = require(path.join(__dirname, "log.js")),
	request = require(path.join(__dirname, "request.js")),
	appID = process.env.OLRT_APP_ID,
	apiKey = process.env.OLRT_API_KEY;

async function trips (stop = "") {
	const key = `trips_${stop}`,
		cached = cache.get(key);
	let result;

	if (cached !== void 0) {
		result = clone(cached);
	} else {
		try {
			result = await request("https://api.octranspo1.com/v1.3/GetNextTripsForStopAllRoutes", {
				headers: {
					"content-type": "application/x-www-form-urlencoded"
				},
				method: "POST",
				body: `appID=${appID}&apiKey=${apiKey}&stopNo=${stop}&format=json`
			});

			if (result !== null) {
				result = result.GetRouteSummaryForStopResult;
				cache.set(key, clone(result));
			}
		} catch (err) {
			log(`type=error, origin=trips, message=${error(err)}`);
			result = null;
		}
	}

	return result;
}

module.exports = trips;

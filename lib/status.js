"use strict";

const path = require("path"),
	clone = require(path.join(__dirname, "clone.js")),
	cache = require(path.join(__dirname, "cache.js")),
	log = require(path.join(__dirname, "log.js")),
	trips = require(path.join(__dirname, "trips.js")),
	stops = require(path.join(__dirname, "stops.js")),
	invalid = new Set(),
	key = "status";

async function status () {
	const cached = cache.get(key);
	let result;

	if (cached !== void 0) {
		result = clone(cached);
		log(`type=status, result=${JSON.stringify(result)}, cached=true`);
	} else {
		const z = [];

		for (const stop of stops) {
			if (invalid.has(stop.code) === false) {
				const x = await trips(stop.code);

				if (x !== null) {
					z.push(await trips(stop.code));
				} else {
					invalid.add(stop.code);
				}
			}
		}

		const errors = z.filter(i => i.Error.length > 0).map(i => i.StopDescription);

		result = errors.length === 0 ? "On schedule." : `Possibly delayed at ${errors.sort().join(", ")}; check back soon!`;
		cache.set(key, clone(result));
		setTimeout(status, cache.ttl);
		log(`type=status, result=${JSON.stringify(result)}, cached=false`);
	}

	return result;
}

module.exports = status;

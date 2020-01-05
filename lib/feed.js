"use strict";

const path = require("path"),
	alerts = require(path.join(__dirname, "alerts.js")),
	cache = require(path.join(__dirname, "cache.js")),
	clone = require(path.join(__dirname, "clone.js")),
	log = require(path.join(__dirname, "log.js")),
	key = "feed";

function relevant (title) {
	return (/(tunney|(o(-)?)?train)/i).test(title);
}

function deep (title = "", description) {
	const s = (/(stopped|cancelled|delayed|reduced)/i).test(description || title),
		r = (/(restored|resumed)/i).test(description || title);

	return s === false || r;
}

module.exports = async () => {
	const now = new Date(),
		current = [now.getFullYear(), now.getMonth() + 1, now.getDate()],
		cached = cache.get(key);
	let result = "",
		data = cached !== void 0 ? clone(cached) : await alerts();

	log(`type=feed, date="${current.join("/")}"`);

	if (data !== void 0) {
		const today = data.reverse();
		let valid = true;

		if (today.length > 0) {
			for (const item of today) {
				if (relevant(item.title[0])) {
					valid = deep(item.title[0], item.description[0]);
				}
			}
		}

		result = valid ? "On schedule." : "Possibly delayed, check back soon!";
	} else {
		result = "Something went wrong, check back soon!";
	}

	return result;
};

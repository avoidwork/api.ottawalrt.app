"use strict";

const path = require("path"),
	cache = require(path.join(__dirname, "cache.js")),
	clone = require(path.join(__dirname, "clone.js")),
	log = require(path.join(__dirname, "log.js")),
	request = require(path.join(__dirname, "request.js")),
	key = "alerts";

module.exports = async () => {
	const now = new Date(),
		current = [now.getFullYear(), now.getMonth() + 1, now.getDate()],
		cached = cache.get(key),
		data = cached !== void 0 ? clone(cached) : await request("https://www.octranspo.com/en/feeds/updates-en/", {headers: {accept: "application/xml"}});
	let result = [];

	if (data !== void 0) {
		result = data.rss.channel[0].item.filter(i => {
			const d = new Date(i.pubDate[0]);

			return d.getFullYear() === current[0] && d.getMonth() + 1 === current[1] && d.getDate() === current[2];
		});
		cache.set(key, clone(result));
	}

	log(`type=alerts, date="${current.join("/")}", results=${result.length}`);

	return result;
};

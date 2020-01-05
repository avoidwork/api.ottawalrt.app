"use strict";

const path = require("path"),
	fetch = require("node-fetch"),
	xml2js = require("xml2js"),
	parser = new xml2js.Parser({trim: true}),
	cache = require(path.join(__dirname, "cache.js")),
	clone = require(path.join(__dirname, "clone.js")),
	log = require(path.join(__dirname, "log.js"));

async function request (url, opt) {
	const method = opt.method || "GET",
		key = `${method}_${url}_${opt.body || ""}`,
		cached = cache.get(key);
	let result;

	if (cached !== void 0) {
		result = clone(cached);
	} else {
		try {
			const res = await fetch(url, opt),
				xml = await res.text();

			try {
				result = await parser.parseStringPromise(xml);
			} catch (err) {
				result = JSON.parse(xml);
			}

			cache.set(key, clone(result));
		} catch (err) {
			void 0;
		}
	}

	log(`type=request, url="${url}", method=${method}, cached=${cached !== void 0}`);

	return result;
}

module.exports = request;

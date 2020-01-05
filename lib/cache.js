"use strict";

const path = require("path"),
	lru = require("tiny-lru"),
	config = require(path.join(__dirname, "..", "config.json")).cache,
	cache = lru(config.cacheSize, config.cacheTTL);

module.exports = cache;

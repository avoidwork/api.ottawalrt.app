"use strict";

function log (arg, target = "log", obj = typeof arg !== "string") {
	if (obj) {
		console[target](obj);
	} else {
		console[target](`${arg}, timestamp=${new Date().toISOString()}`);
	}
}

module.exports = log;

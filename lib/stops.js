"use strict";

const path = require("path"),
	data = require(path.join(__dirname, "..", "stops.json")),
	registry = {};

for (const item of data) {
	const words = item.name.replace(/\s\/\s/g, "/").split(" "),
		dir = (/^(WEST|EAST|NORTH|SOUTH)/).test(words[words.length - 1]) ? words.pop().toLowerCase().split("/")[0] : "",
		name = words.map(i => {
			const n = Array.from(i.replace(/\/.*$/, "")),
				first = n.splice(0, 1);

			return `${first}${n.join("").toLowerCase()}`;
		}).filter(i => i !== "O-train").join(" ");

	if (name in registry === false) {
		registry[name] = {code: item.code, name: name, direction: []};
	}

	registry[name].direction.push({name: dir, coord: item.coord, id: item.id});
}

module.exports = Object.values(registry);

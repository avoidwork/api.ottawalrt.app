"use strict";

module.exports = arg => arg instanceof Error ? arg.stack || arg.message || arg : arg;

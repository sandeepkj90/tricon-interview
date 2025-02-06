const { createLogger, format, transports } = require("winston");

const logger = createLogger({
	format: format.combine(format.timestamp(), format.json()),
	transports: [
		new transports.Console(),
		// You can add file transports here
	],
});

module.exports = logger;

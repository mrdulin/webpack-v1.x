var config = require("../autoconfig");

if (location.search.indexOf("cn") !== -1) {
  config.api = "http://github.com";
}

module.exports = config;

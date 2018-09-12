const path = require('path');

exports.join = (modulePath) => path.join(process.cwd(), modulePath);

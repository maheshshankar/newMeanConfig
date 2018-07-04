(function() {
    const morgan = require('morgan');
    const path = require('path');
    const fs = require('fs');
    const config = require('dotenv').config();
    const rfs = require('rotating-file-stream');
    const envConfig = require('../config/env/' + config.parsed.NODE_ENV);

    module.exports = function(app) {
        let logDirectory = path.join(__dirname, 'logDirectory');
        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
        let streamData = rfs('access.log', {
            interval: '1d',
            path: logDirectory
        })
        app.use(morgan(envConfig.log.format, {
            stream: streamData
        }))
    }
})()
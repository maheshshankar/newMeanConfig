(function() {
    const express = require('express');

    function config(app) {
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-control-Allow-Methods', 'GET,POST,PUT,DELETE');
            res.header('Access-control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
			next()            
        })
    }

    module.exports = config;
})()
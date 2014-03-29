var express = require('express');
var _ = require('lodash');
var uuid = require('uuid');

module.exports = plugin;

function plugin(defcon, app) {

    var name = 'REST Gateway';

    app.use(express.bodyParser());

    app.post(defcon.getPluginUrl(name) + '/v1/event', function(req, res) {

        if (_.isObject(req.body)) return res.send(400, 'Missing body');
        if (req.body.application) return res.send(400, 'An application is required');
        if (req.body.type) return res.send(400, 'A type is required');

        var event = {
            id: uuid.v1(),
            application: req.body.application,
            system: req.body.system || req.body.application,
            host: req.body.host || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            severity: req.body.severity || 1,
            timestamp: req.body.timestamp || new Date()
        }
        defcon.notify('event', event);
        res.json(200, event);
    })

    return {
        name: 'REST Gateway'
    }
}
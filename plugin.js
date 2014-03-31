var express = require('express');
var _ = require('lodash');
var uuid = require('uuid');

module.exports.create = create;

function create(context, next) {

    var app = express();
    app.disable('x-powered-by');
    app.use(express.bodyParser());

    var plugin = {
        name: 'REST Gateway',        
        app: app
    }    

    app.post('/api/v1/event', function(req, res) {

        if (!_.isObject(req.body)) return res.send(400, 'Missing body\n');
        if (!req.body.system) return res.send(400, 'A system is required\n');
        if (!req.body.type) return res.send(400, 'A type is required\n');

        var event = {
            id: uuid.v1(),
            severity: req.body.severity || 1,            
            system: req.body.system,
            group: req.body.group,
            environment: req.body.environment,
            host: req.body.host || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            type: req.body.type,
            timestamp: req.body.timestamp || new Date(),
            message: req.body.message,
            link: req.body.link
        }

        context.defcon.notify('event', event);
        res.json(200, event);
    }) 

    next(null, plugin);
}
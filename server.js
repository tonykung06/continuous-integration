var express = require('express');
var mongoose = require('mongoose');
var jobModel = require('./models/Job');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function(req, res) {
    mongoose.model('Job').find({}).exec(function(err, collection) {
        res.send(collection);
    });
});

app.get('*', function(req, res) {
    res.render('index');
});

mongoose.connect('mongodb://tonykung06:k88578345@ds023448.mlab.com:23448/continuous-integration');

var connection = mongoose.connection;

connection.once('open', function() {
    console.log('connected to mongodb');
    jobModel.seedJobs();
});

app.listen(process.env.PORT, process.env.IP);
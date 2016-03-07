var express = require('express');
var jobsData = require('./jobs-data');
var config = require('./config/dev');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function(req, res) {
    jobsData.findJobs({})().then(function(jobs) {
        res.send(jobs);
    });
});

app.get('*', function(req, res) {
    res.render('index');
});

jobsData.connectDb(config.MONGODB_CONN).then(function() {
    console.log('connected to mongodb');
    jobsData.seedJobs();
});

app.listen(process.env.PORT, process.env.IP);
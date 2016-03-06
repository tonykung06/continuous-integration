var express = require('express');
var jobsData = require('./jobs-data');

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

jobsData.connectDb('mongodb://tonykung06:k88578345@ds023448.mlab.com:23448/continuous-integration').then(function() {
    console.log('connected to mongodb');
    jobsData.seedJobs();
});

app.listen(process.env.PORT, process.env.IP);
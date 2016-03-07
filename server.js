var express = require('express');
var jobsData = require('./jobs-data');
var config = require('./config/dev');
var jobService = require('./job-service');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

jobService(jobsData, app);

app.get('*', function(req, res) {
    res.render('index');
});

jobsData.connectDb(config.MONGODB_CONN).then(function() {
    console.log('connected to mongodb');
    jobsData.seedJobs();
});

app.listen(process.env.PORT, process.env.IP);
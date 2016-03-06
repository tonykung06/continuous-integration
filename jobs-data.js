var Promise = require('bluebird');
var mongoose = require('mongoose');
var jobModel = require('./models/Job');

var findJobs = function(condition) {
    var query = jobModel.Job.find(condition);

    return Promise.promisify(query.exec, {
        context: query
    });
};

exports.findJobs = findJobs;

exports.connectDb = Promise.promisify(mongoose.connect, {
    context: mongoose
});


var jobs = [{
   title: 'Cook1' ,
   description: 'testing1'
}, {
   title: 'Cook2' ,
   description: 'testing2'
}, {
   title: 'Cook3' ,
   description: 'testing3'
}, {
   title: 'Cook4' ,
   description: 'testing4'
}];

var createJob = Promise.promisify(jobModel.Job.create, {
    context: jobModel.Job
});

exports.seedJobs = function() {
    return findJobs({})().then(function(existingJobs) {
        if (existingJobs.length < 1) {
            return Promise.map(jobs, function(job) {
                return createJob(job);
            });
        }
    });
};

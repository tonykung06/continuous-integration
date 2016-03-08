var Promise = require('bluebird');
var mongoose = require('mongoose');
var jobModel = require('./models/Job');

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

var findJobs = function(condition) {
    var query = jobModel.Job.find(condition);

    return Promise.promisify(query.exec, {
        context: query
    });
};

var saveJob = Promise.promisify(jobModel.Job.create, {
    context: jobModel.Job
});

module.exports = {
    seedJobs: function seedJobs() {
        return findJobs({})().then(function(existingJobs) {
            if (existingJobs.length < 1) {
                return Promise.map(jobs, function(job) {
                    return saveJob(job);
                });
            }
        });
    },
    saveJob: saveJob,
    findJobs: findJobs,
    connectDb: Promise.promisify(mongoose.connect, {
        context: mongoose
    })
};


var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
   title: {
       type: String
   },
   description: {
       type: String
   }
});

var Job = mongoose.model('Job', jobSchema);

exports.seedJobs = function() {
    Job.find({}).exec(function(err, collection) {
        if (!collection || collection.length < 1) {
            Job.create({
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
            });
        }
    });
};

var expect = require('chai').expect;
var mongoose = require('mongoose');
var Promise = require('bluebird');
var jobsData = require('../jobs-data');
var config = require('../config/' + (process.env.ENVIRONMENT || 'dev'));

var resetJobs = function() {
    return new Promise(function(resolve, reject) {
        mongoose.connection.db.listCollections({name: 'jobs'}).next(function(err, collinfo) {
            if (err) {
                reject(err);
            }
            
            if (collinfo) {
                mongoose.connection.collection('jobs').drop().then(resolve).catch(reject);
            } else {
                resolve();
            }
        });
    });
};

describe('get jobs', function() {
    var jobs;
    
    before(function(done) {
        this.timeout(5000);
        
        console.log('what is the connection string', config.MONGODB_CONN);
        
        jobsData.connectDb(config.MONGODB_CONN)
        .then(resetJobs)
        .then(jobsData.seedJobs)
        .then(jobsData.findJobs({}))
        .then(function(collection) {
            jobs = collection;
            done();
        }).catch(done);
    });
    
    after(function(done) {
        mongoose.connection.close(done);
    });
    
    it('should never be empty since jobs are seeded', function() {
        expect(jobs.length).to.be.at.least(1);
    });
    
    it('should have a job with a title', function() {
        expect(jobs[0].title).to.be.not.empty;
    });
    
    it('should have a job with a description', function() {
        expect(jobs[0].description).to.be.not.empty;
    });
});
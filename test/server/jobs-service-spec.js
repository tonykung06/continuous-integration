var express = require('express');
var app = express();
var expect = require('chai').expect;
var request = require('supertest');
var Promise = require('bluebird');

//mock data layer
var savedJob;
var currentJobs = [{
   title: 'mock job title 1' ,
   description: 'mock job description 1'
}, {
   title: 'mock job title 2' ,
   description: 'mock job description 2'
}];
var db = {
    saveJob: function(job) {
        savedJob = job;
    },
    findJobs: function(query) {
        return function() {
            return Promise.resolve(currentJobs);
        };
    }
};

var jobService = require('../../job-service')(db, app);

describe('save jobs', function() {
    it('should validate that title is greater than 4 characters');
    it('should validate that title is less than 40 characters');
    it('should validate that description is greater than 4 characters');
    it('should validate that description is less than 250 characters');

    var newJob = {
       title: 'mock job title' ,
       description: 'mock job description'
    };
    
    it('should pass the job to the database save', function(done) {
        request(app).post('/api/jobs').send(newJob).end(function(err, response) {
           expect(savedJob).to.deep.equal(newJob);
           done();
        });
    });
    it('should return a status of 200 to the frontend if the data is saved');
    it('should return a job with an id');
    it('should return an error if the database save is failed');
});

describe('get jobs', function() {
    it('should retrieve the jobs', function(done) {
        request(app).get('/api/jobs').end(function(err, response, body) {
            expect(response.body).to.deep.equal(currentJobs);
            done();
        });
    });
    
    it('should give me a json list of jobs', function(done) {
        request(app).get('/api/jobs').expect('Content-Type', /json/).end(function(err, res) {
            expect(res.body).to.be.a('Array');
            done();
        });
    });
});
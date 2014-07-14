'use strict';

var request = require('supertest');
var should = require('should');

var master = require('../master/app.js');
var slave = require('../slave/app.js');

describe('Master server', function () {
  var email = 'email@example.com';
  var password = '123456';

  it('should return new user email and id', function (done) {
    request(master)
    .post('/api/users')
    .send({
      email: email,
      password: password
    })
    .expect(200)
    .end(function (err, res) {
      res.body.email.should.equal(email);
      res.body.id.should.be.an.instanceOf(Number);
      done();
    });
  });
});

describe('Slave server', function () {
  var email = 'anotheremail@example.com';
  var password = '123456';

  it('should return new user email and id', function (done) {
    request(slave)
    .post('/api/users')
    .send({
      email: email,
      password: password
    })
    .expect(200)
    .end(function (err, res) {
      res.body.email.should.equal(email);
      res.body.id.should.be.an.instanceOf(Number);
      done();
    });
  });
});

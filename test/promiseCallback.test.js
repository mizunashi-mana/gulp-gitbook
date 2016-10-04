'use strict';

var expect = require('./helper').expect;

var gulpGitbook = require('..');
var promiseCallback = gulpGitbook._private.promiseCallback;

describe('promiseCallback', function () {

  it('should call callback from resolve', function (done) {
    promiseCallback(Promise.resolve(), function (err) {
      expect(err).to.be.undefined;
      done();
    });
  });

  it('should call callback with error from reject', function (done) {
    var errObj = new Error('error');

    promiseCallback(Promise.reject(errObj), function (err) {
      expect(err).to.equal(errObj);
      done();
    });
  });

  it('should return void', function (done) {
    expect(promiseCallback(Promise.resolve(), function (err) {
      expect(err).to.be.undefined;
      done();
    })).to.be.undefined;
  });

});

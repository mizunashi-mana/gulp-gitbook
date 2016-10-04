'use strict';

var expect = require('./helper').expect;

var gulpGitbook = require('..');
var isNullable = gulpGitbook._private.isNullable;

describe('isNullable', function () {

  it('should be ok for nullable values', function () {
    expect(isNullable(null)).to.be.true;
    expect(isNullable(undefined)).to.be.true;
    expect(isNullable(false)).to.be.false;
    expect(isNullable(0)).to.be.false;
    expect(isNullable('')).to.be.false;
    expect(isNullable({})).to.be.false;
    expect(isNullable(true)).to.be.false;
  });

});

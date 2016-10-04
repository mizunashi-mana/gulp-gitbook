'use strict';

var expect = require('./helper').expect;

var gulpGitbook = require('..');
var commands = gulpGitbook._private.commands;

describe('commands', function () {

  it('should have base commands', function () {
    expect(commands).to.contain.all.keys([
      'build',
      'install',
      'serve'
    ]);
    expect(commands).to.contain.all.keys([
      'pdf',
      'epub',
      'mobi'
    ]);
  });

});

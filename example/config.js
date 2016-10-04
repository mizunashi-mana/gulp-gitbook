'use strict';

// npm install gulp gitbook gulp-gitbook

var gulp = require('gulp');
var gulpGitbook = require('..');

/**
 * Simple example of GitBook
 */
gulp.task('basic', function (cb) {
  gulpGitbook('.', cb);
});

gulp.task('default', [
  'basic'
], function () {
  console.log('All tasks completed successfully.');
});

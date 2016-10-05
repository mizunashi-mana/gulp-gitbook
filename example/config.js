'use strict';

// npm install gulp gitbook gulp-gitbook

var gulp = require('gulp');
var gulpGitbook = require('..');

var runSequence = require('run-sequence');

/**
 * Simple example of GitBook
 */
gulp.task('basic', function (cb) {
  gulpGitbook('.', cb);
});

/**
 * Generate PDF example
 */
gulp.task('pdf', function (cb) {
  gulpGitbook.pdf('.', cb);
});

/**
 * Generate EPUB example
 */
gulp.task('epub', function (cb) {
  gulpGitbook.epub('.', cb);
});

/**
 * Without install task example
 */
gulp.task('noinstall', function (cb) {
  gulpGitbook('.', {
    noInstall: true
  }, cb);
});

gulp.task('default', function (cb) {
  runSequence(
    'basic',
    'pdf',
    'epub',
    'noinstall',
    function () {
      console.log('All tasks completed successfully');
      cb();
    }
  );
});

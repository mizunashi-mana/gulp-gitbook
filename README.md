# gulp-gitbook [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url]

> A [Gulp](http://gulpjs.com/) plugin for [GitBook](https://github.com/GitbookIO/gitbook/)

## Installation

```bash
npm install --save gitbook gulp-gitbook
```

## Usage

See [Example](example/) for more information.

```javascript
var gulpGitbook = require('gulp-gitbook');

gulp.task('build-doc', function (cb) {
  gulpGitbook('./doc/', cb);
});
```

## API

```javascript
gulpGitbook(callback)
gulpGitbook(book, callback)
gulpGitbook(options, callback)
gulpGitbook(book, options, callback)
```

### book

### options

### callback

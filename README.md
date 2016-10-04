# gulp-gitbook [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status][coveralls-image]][coveralls-url]

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

## License

MIT © [Mizunashi Mana](https://github.com/mizunashi-mana)


[npm-image]: https://badge.fury.io/js/generator-node-gulp-ts.svg
[npm-url]: https://npmjs.org/package/generator-node-gulp-ts
[travis-image]: https://travis-ci.org/mizunashi-mana/generator-node-gulp-ts.svg?branch=master
[travis-url]: https://travis-ci.org/mizunashi-mana/generator-node-gulp-ts
[daviddm-image]: https://david-dm.org/mizunashi-mana/generator-node-gulp-ts.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mizunashi-mana/generator-node-gulp-ts
[coveralls-image]: https://img.shields.io/coveralls/mizunashi-mana/gulp-gitbook.svg
[coveralls-url]: https://coveralls.io/r/mizunashi-mana/gulp-gitbook

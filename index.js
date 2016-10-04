'use strict';

var GulpUtil = require('gulp-util');
var GitBook = require('gitbook');
var extend = require('extend');
var PLUGIN_NAME = require('./package.json').name;

var promiseCallback = function (promise, callback) {
  promise
    .then(function () {
      try {
        return callback();
      } catch (err) {
        return;
      }
    })
    .catch(function (err) {
      return callback(err);
    })
    ;

  return;
};

var commands = {};
GitBook.commands.forEach(function (cmd) {
  commands[cmd.name.split(' ')[0]] = cmd;
});

var gitbookExec = function (command, args, opts) {
  var commandOptions = {};
  commands[command].options.forEach(function (option) {
    commandOptions[option.name] = opts[option.name] || option.defaults;
  });

  return commands[command].exec(args, commandOptions);
};

var isNullable = function (obj) {
  return obj === undefined || obj === null;
};

var validateOptions = function (book, options, callback) {
  if (typeof book === 'function') {
    options = {};
    callback = book;
  } else if (typeof options === 'function') {
    callback = options;
    if (typeof book === 'object') {
      options = extend({}, book);
    } else {
      options = {
        book: book
      };
    }
  } else {
    options = extend({}, options);
  }

  if (isNullable(book)) {
    // do nothing
  } else if (typeof book === 'string') {
    options.book = book;
  } else {
    throw new TypeError('Expected a book string');
  }

  if (isNullable(options)) {
    // do nothing
  } else if (typeof options === 'object') {
    // do nothing
  } else {
    throw new TypeError('Expected a options');
  }

  if (typeof callback === 'function') {
    options.callback = callback;
  } else {
    console.log(callback);
    throw new TypeError('Expected a callback function');
  }

  return options;
};

var pluginError = function (message) {
  return GulpUtil.PluginError(PLUGIN_NAME, message);
};

var gulpGitbook = function (book, options, callback) {
  options = validateOptions(book, options, callback);

  var p = Promise.resolve();

  p = p.then(function () {
    return gitbookExec('install', [
      options.book
    ], {
      log: options.log
    });
  });

  p = p.then(function () {
    return gitbookExec('build', [
      options.book,
      options.outputDir
    ], {
      log: options.log,
      format: options.format
    });
  });

  return promiseCallback(p, function (err) {
    if (err) {
      return options.callback(pluginError(err.message));
    }
    return options.callback();
  });
};

module.exports = gulpGitbook;

if (process.env.GULPGITBOOK_TEST_ENV) {
  module.exports._private = {
    promiseCallback: promiseCallback,
    gitbookExec: gitbookExec,
    isNullable: isNullable,
    validateOptions: validateOptions
  };
}

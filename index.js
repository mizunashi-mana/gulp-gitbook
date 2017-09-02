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
  return new GulpUtil.PluginError(PLUGIN_NAME, message);
};

var _gulpGitbook = function (options) {
  var p = Promise.resolve();

  if (!options.noInstall) {
    p = p.then(function () {
      return gitbookExec('install', [
        options.book
      ], {
        log: options.log
      });
    });
  }

  var buildArgs = [
    options.book,
    options.outputDir
  ];
  var buildOptions = {
    log: options.log
  };

  if (options.format === 'website') {
    p = p.then(function () {
      return gitbookExec('build', buildArgs, buildOptions);
    });
  } else if (options.format === 'pdf') {
    p = p.then(function () {
      return gitbookExec('pdf', buildArgs, buildOptions);
    });
  } else if (options.format === 'epub') {
    p = p.then(function () {
      return gitbookExec('epub', buildArgs, buildOptions);
    });
  } else if (options.format === 'mobi') {
    p = p.then(function () {
      return gitbookExec('mobi', buildArgs, buildOptions);
    });
  } else {
    buildOptions.format = options.format;
    p = p.then(function () {
      return gitbookExec('build', buildArgs, buildOptions);
    });
  }

  return promiseCallback(p, function (err) {
    if (err) {
      return options.callback(pluginError(err.message));
    }
    return options.callback();
  });
};

var gulpGitbook = function (book, options, callback) {
  options = validateOptions(book, options, callback);
  return _gulpGitbook(options);
};

var gulpGitbookWebsite = function (book, options, callback) {
  options = validateOptions(book, options, callback);
  options.format = 'website';
  return _gulpGitbook(options);
};
gulpGitbook.website = gulpGitbookWebsite;

var gulpGitbookPdf = function (book, options, callback) {
  options = validateOptions(book, options, callback);
  options.format = 'pdf';
  return _gulpGitbook(options);
};
gulpGitbook.pdf = gulpGitbookPdf;

var gulpGitbookEpub = function (book, options, callback) {
  options = validateOptions(book, options, callback);
  options.format = 'epub';
  return _gulpGitbook(options);
};
gulpGitbook.epub = gulpGitbookEpub;

var gulpGitbookMobi = function (book, options, callback) {
  options = validateOptions(book, options, callback);
  options.format = 'mobi';
  return _gulpGitbook(options);
};
gulpGitbook.mobi = gulpGitbookMobi;

var gulpGitbookInstall = function (book, options, callback) {
  options = validateOptions(book, options, callback);

  var p = Promise.resolve();

  p = p.then(function () {
    return gitbookExec('install', [
      options.book
    ], {
      log: options.log
    });
  });

  return promiseCallback(p, function (err) {
    if (err) {
      return options.callback(pluginError(err.message));
    }
    return options.callback();
  });
};
gulpGitbook.install = gulpGitbookInstall;

var gulpGitbookServe = function (book, options, callback) {
  options = validateOptions(book, options, callback);

  var p = Promise.resolve();

  p = p.then(function () {
    return gitbookExec('serve', [
      options.book,
      options.outputDir
    ], {
      log: options.log,
      format: options.format,
      open: options.noopen === undefined ? true : !options.noopen,
      port: options.port,
      live: options.livereload === undefined ? undefined : options.livereload !== false,
      lrport: typeof options.livereload === 'object' ? options.livereload.port : undefined,
      watch: typeof options.livereload === 'object' ? options.livereload.watch : undefined,
      browser: options.browser
    });
  });

  return promiseCallback(p, function (err) {
    if (err) {
      return options.callback(pluginError(err.message));
    }
    return options.callback();
  });
};
gulpGitbook.serve = gulpGitbookServe;

module.exports = gulpGitbook;

if (process.env.GULPGITBOOK_TEST_ENV) {
  module.exports._private = {
    _gulpGitbook: _gulpGitbook,
    promiseCallback: promiseCallback,
    isNullable: isNullable,
    validateOptions: validateOptions,
    gitbookExec: gitbookExec,
    commands: commands
  };
}

const webpackConfig = require('./webpack-test.config.js');
// webpackConfig.mode = 'production';

module.exports = function(config) {
  config.set({
    singleRun: true,

    browsers: [
      'ChromeHeadless'
    ],

    frameworks: [
      'jasmine'
    ],

    files: [
      'spec.bundle.js'
    ],

    preprocessors: {
      'spec.bundle.js': ['webpack']
    },

    mime: {
      'text/x-typescript': ['ts']
    },


    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    reporters: ['spec'],

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-webpack'),
      "karma-spec-reporter"
    ]
  });
};
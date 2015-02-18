// Karma configuration
// Generated on Tue Feb 17 2015 21:57:05 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    frameworks: ['jasmine', 'mocha', 'sinon', 'chai', 'chai-sinon'],

    // list of files / patterns to load in the browser
    files: [
      // lib files
      'client/www/lib/ionic/js/ionic.bundle.js',
      'client/www/lib/angular-mocks/angular-mocks.js',
      'client/www/lib/angular-ui-router/release/angular-ui-router.js',
      'client/www/lib/angular-animate/angular-animate.js',
      'client/www/lib/angular-sanitize/angular-sanitize.js',

      // app - need to load feature modules first, otherwise app breaks
      'client/www/app/moment/moment.module.js',
      'client/www/app/core/core.module.js',
      'client/www/app/**/*.js',

      // all specs
      'client/www/test/**/*.js'
    ],

    // list of files to exclude
    exclude: [
      'karma.conf.js'
    ],

    preprocessors: {
      // Source files you want to generate coverage reports for
      // This should not include tests or libraries
      // These files will be instrumented by Istanbul
      'client/www/app/**/*.js': ['coverage']
    },

    // progress reporter: lists each test run and whether they pass/fail
    // coverage reporter: creates coverage reports for every tested browser
    reporters: ['progress', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    browsers: ['Chrome'],

    // If browser does not capture in given timeout [ms], kill it
    singleRun: false,

    // report which specs run too slow
    reportSlowerThan: 500,

    // any additional plugins needed for testing
    plugins: [
      'karma-jasmine',
      'karma-sinon',
      'karma-chai-sinon',
      'karma-coverage',
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher'
    ]
  });
};

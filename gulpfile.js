// include gulp
var gulp = require('gulp');

// include plugins
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
/*old testing framework
var mocha = require('gulp-mocha');*/
var karma = require('gulp-karma');
var shell = require('gulp-shell');

// the paths to our app files
var paths = {
  scripts: 'client/www/app/**/*.js',
  html:    'client/www/app/**/*.html',
  test:    'client/www/test/**/*.js',
  sass:    'client/scss/**/*.scss'
};

// run linting
gulp.task('lint', function(done) {
  'use strict';
  return gulp.src(['gulpfile.js', paths.scripts])
    .pipe(jshint())
    .pipe(jshint.reporter('default'), done);
});

/*// old run tests
gulp.task('mocha', function(done) {
  'use strict';
  return gulp.src(paths.test)
    .pipe(mocha({reporter: 'spec'}), done);
});*/

// new run tests
gulp.task('karma', function() {
  return gulp.src('./foobar') // 
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      throw err;
    });
});

// compile sass
gulp.task('sass', function(done) {
  gulp.src('/client/scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('/client/www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('/client/www/css/'))
    .on('end', done);
});

// run tests
gulp.task('test', ['karma']);

// FIXME: edit to watch all appropriate files
gulp.task('watch', function() {
  'use strict';
  gulp.watch(paths.sass, ['sass']);
});

// FIXME: to run all appropriate tasks on start
gulp.task('default', ['sass']);

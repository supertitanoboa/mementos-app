// include gulp
var gulp = require('gulp');

// include plugins
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

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

// run tests
gulp.task('mocha', function(done) {
  'use strict';
  return gulp.src(paths.test)
    .pipe(mocha({reporter: 'spec'}), done);
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
gulp.task('test', ['mocha']);

// FIXME: edit to watch all appropriate files
gulp.task('watch', function() {
  'use strict';
  gulp.watch(paths.sass, ['sass']);
});

// FIXME: to run all appropriate tasks on start
gulp.task('default', ['sass']);

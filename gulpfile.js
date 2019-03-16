'use strict';

var gulp        = require('gulp'),
  sass          = require('gulp-sass'),
  rename        = require('gulp-rename'),
  changed       = require('gulp-changed'),
  cssnano       = require('gulp-cssnano'),
  autoprefixer  = require('gulp-autoprefixer');

// --------------------------------------------------
// SASS - Compile Sass files into CSS
// --------------------------------------------------

gulp.task('sass', function () {
  // Theme
  gulp.src('./assets/include/scss/**/*.scss')
    .pipe(changed('./assets/css/'))
    .pipe(sass({ outputStyle: 'expanded' }))
    .on('error', sass.logError)
  .pipe(autoprefixer([
      "last 1 major version",
      ">= 1%",
      "Chrome >= 45",
      "Firefox >= 38",
      "Edge >= 12",
      "Explorer >= 10",
      "iOS >= 9",
      "Safari >= 9",
      "Android >= 4.4",
      "Opera >= 30"], { cascade: true }))
  .pipe(gulp.dest('./assets/css/'));
});


// --------------------------------------------------
// CSS minifier - minifies the below given lists
// --------------------------------------------------

gulp.task('minCSS', function() {
  return gulp.src([
    './assets/css/theme.css',
  ])
  .pipe(cssnano())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./dist/css/'));
});


// --------------------------------------------------
// [Gulp Tasks and Watch]
// --------------------------------------------------

// This handles watching and running tasks
gulp.task('watch', function () {
  gulp.watch('./assets/include/scss/**/*.scss', ['sass']);
});

// Lets us type "gulp" on the command line and run all of our tasks
gulp.task('default', ['watch', 'sass']);

// Use "gulp dist" to create dist folder with minified css and js files
gulp.task('dist', ['minCSS']);
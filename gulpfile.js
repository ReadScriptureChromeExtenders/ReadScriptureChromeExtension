/* global require: true */
'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    gutil = require('gulp-util');

var paths = {
    css: [
        'static/scss/readscripture.scss',
    ]
};

gulp.task('css', function() {

  return gulp.src(paths.css)
    .pipe(autoprefixer())
    .pipe(sass({ style: 'compressed' }))
    .pipe(gulp.dest('static/css/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(['static/scss/*.scss'], ['css']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['css', 'watch']);

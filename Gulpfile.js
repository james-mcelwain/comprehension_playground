// dependencies
const
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade');

const config = {
  paths : {
    sass : './*.scss',
    css : './dist/styles',
    es6 : './main.js', // entry point to js for browserify
    js : './dist/scripts',
    jade : './*jade',
    html : './dist/'
  }
}

gulp.task('default', ['sass', 'jade'],
    function(){
        gutil.log('Gulped!');
    });

gulp.task('sass', function () {
    gulp.src(config.paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.paths.css));
});

gulp.task('jade', function() {
    gulp.src(config.paths.jade)
        .pipe(jade())
        .pipe(gulp.dest(config.paths.html))
});

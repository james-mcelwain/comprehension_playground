'use strict';

// dependencies
import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import gutil from 'gulp-util';
import jade from 'gulp-jade';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream'

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

gulp.task('default', ['sass', 'jade', 'js'],
    function(){
        gutil.log('Gulped!');
    });

gulp.task('sass', () => {
  return gulp.src(config.paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass.sync())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.paths.css));
})

gulp.task('js', function() {
    browserify(config.paths.es6)
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.js));
});

gulp.task('jade', () => {
    return gulp.src(config.paths.jade)
        .pipe(jade())
        .pipe(gulp.dest(config.paths.html))
});

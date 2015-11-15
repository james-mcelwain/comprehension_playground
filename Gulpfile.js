// dependencies
const
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    jade = require('gulp-jade');

const config = {
  transforms: [babelify],
  paths: {
    sass: './sass/*.scss',
    css: './dist/styles',
    es6: './main.js', // entry point to js for browserify
    js: './dist/scripts',
    jade: './*jade',
    html: './dist/'
  }
}

gulp.task('default', [ 'js', 'sass', 'jade'],
    function(){
        gutil.log('Gulped!');
    });

gulp.task('js', function() {
    browserify(config.paths.es6)
        .transform(config.transforms)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.js));
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

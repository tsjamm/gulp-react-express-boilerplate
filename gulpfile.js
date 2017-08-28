var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var lessPluginAutoprefix = require('less-plugin-autoprefix');
var lessAutoprefix = new lessPluginAutoprefix({ browsers: ['last 2 versions'] });
var lessToScss = require('gulp-less-to-scss');
var path = require('path');
var babel = require('gulp-babel');
var gls = require('gulp-live-server');
var webpack = require('webpack-stream');
var swPrecache = require('sw-precache');

var paths = {
    base: './',
    src: './src/',
    build: './build/',
    server: './'
};

/// The Service Worker Gulp Task - Uses swPrecache
gulp.task('service-worker', function(callback) {
    swPrecache.write(path.join(paths.build, 'service-worker.js'), {
        staticFileGlobs: [
            paths.build + '*'
        ],
        importScripts: [
            'node_modules/sw-toolbox/sw-toolbox.js',
            'build/toolbox-script.js'
        ],
        stripPrefix: paths.build
    }, callback);
});

/// Copies HTML files from src to build directory
gulp.task('processHTML', function() {
    gulp.src(path.join(paths.src, '*.html'))
        .pipe(gulp.dest(path.join(paths.build)));
});

/// Copies Assets from src to build directory
gulp.task('processAssets', function() {
    gulp.src(path.join(paths.src, '/assets/**/*'))
        .pipe(gulp.dest(path.join(paths.build, 'assets')));
});

/// Minifies and Copies JS files from src to build
gulp.task('processJS', function() {
    gulp.src(path.join(paths.src, 'scripts/*.js'))
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['latest'] }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.join(paths.build, 'scripts')));
});

/// Processes React jsx files and puts in build directory
gulp.task('processReact', function() {
    gulp.src(path.join(paths.src, 'react/*.jsx'))
        .pipe(sourcemaps.init())
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.join(paths.build, 'react')));
});


gulp.task('processStyles', function() {
    // Less to CSS, copies to build dir
    gulp.src(path.join(paths.src, 'styles/*.less'))
        .pipe(sourcemaps.init())
        .pipe(less({ strictMath: 'on' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.join(paths.build, 'styles')));
});

gulp.task('processStyleSources', function() {
    // Copies Less files to build dir
    gulp.src(path.join(paths.src, '/styles/**/*.less'))
        .pipe(gulp.dest(path.join(paths.build, 'styles')));
    // Less to Scss and copies to build dir
    gulp.src(path.join(paths.src, 'styles/**/*.less'))
        .pipe(lessToScss())
        .pipe(gulp.dest(path.join(paths.build, 'styles')));
});

// This goes through the build process from src to build dir.
gulp.task('build', ['processStyles', 'processJS', 'processReact', 'processAssets', 'processHTML', 'service-worker']);

// Serves by default
gulp.task('default', ['serve']);

gulp.task('serve', ['build'], function() {
    var server = gls.new(path.join(paths.server, 'server.js'));
    server.start();

    gulp.watch(path.join(paths.src, 'styles/**/*.less'), ['processStyles']).on('change', function(file) { server.notify.apply(server, [file]) });
    gulp.watch(path.join(paths.src, 'scripts/**/*.js'), ['processJS']).on('change', function(file) { server.notify.apply(server, [file]) });
    gulp.watch(path.join(paths.src, 'react/**/*.jsx'), ['processReact']).on('change', function(file) { server.notify.apply(server, [file]) });
    gulp.watch(path.join(paths.src, '*.html'), ['processHTML']).on('change', function(file) { server.notify.apply(server, [file]) });
    gulp.watch(path.join(paths.src, 'assets/**/*'), ['processAssets']).on('change', function(file) { server.notify.apply(server, [file]) });
    gulp.watch(path.join(paths.base, 'server.js')).on('change', function() { server.start.bind(server) });
});
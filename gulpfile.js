var gulp = require('gulp');
var rename = require('gulp-rename');
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
    public: './public/',
    server: './server/'
};

/// The Service Worker Gulp Task - Uses swPrecache
gulp.task('service-worker', function(callback) {
    swPrecache.write(path.join(paths.build, paths.public, 'service-worker.js'), {
        staticFileGlobs: [
            //paths.build + '*'
            path.join(paths.build, paths.public, '*')
        ],
        importScripts: [
            'node_modules/sw-toolbox/sw-toolbox.js',
            'build/toolbox-script.js'
        ],
        stripPrefix: path.join(paths.build, paths.public) //paths.build
    }, callback);
});

/// Copies HTML files from src to build directory
gulp.task('processHTML', function() {
    gulp.src(path.join(paths.src, paths.public, '*.html'))
        .pipe(gulp.dest(path.join(paths.build, paths.public)));
});

/// Copies Assets from src to build directory
gulp.task('processAssets', function() {
    gulp.src(path.join(paths.src, paths.public, '/assets/**/*'))
        .pipe(gulp.dest(path.join(paths.build, paths.public, 'assets')));
});

/// Minifies and Copies JS files from src to build
gulp.task('processJS', function() {
    gulp.src(path.join(paths.src, paths.public, 'scripts/*.js'))
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['latest'] }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.join(paths.build, paths.public, 'scripts')));
});

/// Processes React jsx files and puts in build directory
gulp.task('processReact', function() {
    gulp.src(path.join(paths.src, paths.public, 'react/*.jsx'))
        .pipe(sourcemaps.init())
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.join(paths.build, paths.public, 'react')));
    gulp.src(path.join(paths.src, paths.public, 'react/**/*.jsx'))
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['latest', 'react'] }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(rename(function(path) {
            path.extname = ".jsx"
        }))
        .pipe(gulp.dest(path.join(paths.build, paths.public, 'react')));
});


gulp.task('processStyles', function() {
    // Less to CSS, copies to build dir
    gulp.src(path.join(paths.src, paths.public, 'styles/*.less'))
        .pipe(sourcemaps.init())
        .pipe(less({ strictMath: 'on' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.join(paths.build, paths.public, 'styles')));
});

gulp.task('processStyleSources', function() {
    // Copies Less files to build dir
    gulp.src(path.join(paths.src, paths.public, '/styles/**/*.less'))
        .pipe(gulp.dest(path.join(paths.build, paths.public, 'styles')));
    // Less to Scss and copies to build dir
    gulp.src(path.join(paths.src, paths.public, 'styles/**/*.less'))
        .pipe(lessToScss())
        .pipe(gulp.dest(path.join(paths.build, paths.public, 'styles')));
});

/// Using Babel to transpile es6/react code to node compatible code
gulp.task('processServer', function() {
    gulp.src(path.join(paths.src, paths.server, 'server.js'))
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['latest', 'react'] }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.join(paths.build, paths.server)));
});

// This goes through the build process from src to build dir.
gulp.task('build', ['processServer', 'processStyles', 'processJS', 'processReact', 'processAssets', 'processHTML', 'service-worker']);

// Serves by default
gulp.task('default', ['serve']);

gulp.task('serve', ['build'], function() {
    var server = gls.new(path.join(paths.build, paths.server, 'server.js'));
    server.start();

    gulp.watch(path.join(paths.src, paths.public, 'styles/**/*.less'), ['processStyles']).on('change', function(file) { server.notify.apply(server, [file]) });
    gulp.watch(path.join(paths.src, paths.public, 'scripts/**/*.js'), ['processJS']).on('change', function(file) { server.notify.apply(server, [file]) });
    gulp.watch(path.join(paths.src, paths.public, 'react/**/*.jsx'), ['processReact']).on('change', function(file) { server.notify.apply(server, [file]) });
    gulp.watch(path.join(paths.src, paths.public, '*.html'), ['processHTML']).on('change', function(file) { server.notify.apply(server, [file]) });
    gulp.watch(path.join(paths.src, paths.public, 'assets/**/*'), ['processAssets']).on('change', function(file) { server.notify.apply(server, [file]) });
    gulp.watch(path.join(paths.src, paths.server, 'server.js'), ['processServer']).on('change', function() { server.start.bind(server) });
});
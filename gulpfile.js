var gulp = require('gulp');
var typescript = require('gulp-tsc');
var tsConfig = require('./src/tsconfig.json');
var _ = require('lodash');
var server = require('gulp-express');
var mocha = require('gulp-mocha');

tsConfig.compilerOptions = _.omit(tsConfig.compilerOptions, 'outDir');
tsConfig.files = tsConfig.files.map(correctPath);
tsConfig.filesGlob = tsConfig.filesGlob.map(correctPath);

function correctPath(file) {
  return file.replace(/^.\//, './src/');
}

gulp.task('test', function () {
  return gulp.src('build/tests/**/*.test.js', {read: false})
      .pipe(mocha({reporter: 'spec'}));
});

gulp.task('compile', function(){
  gulp.src(['src/**/*.ts'])
    .pipe(typescript(tsConfig))
    .pipe(gulp.dest('build/'));
});

gulp.task('server', function () {
  // Start the server at the beginning of the task
  server.run(['build/index.js']);
});

gulp.task('restart-server', function () {
  server.notify();
});

gulp.task('default', ['compile', 'server'], function () {
  gulp.watch(['src/**/*.ts'], ['compile', 'server']);
});

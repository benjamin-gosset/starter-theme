const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');

const server = browserSync.create();
const url = 'http://site.local';

function compileCSS() {
  return src('./sass/main.sass')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./css'))
    .pipe(server.stream())
}

function reloadTask(done) {
  server.reload();
  done();
}

function startTask(done) {
  server.init({
    proxy: url,
    open: true,
    ghostMode: false
  });
  done();
}

function fonts() {
    return src('src/fonts/**/*')
    .pipe(dest('dist/fonts'))
}

function watchTask() {
  watch('sass/**/*.sass', compileCSS);
  watch('**/*.php', reloadTask);
  watch('js/**/*.js', reloadTask);
}

exports.default = series(startTask, watchTask);

require('es6-promise').polyfill();
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cleanCSS = require('gulp-clean-css');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');

gulp.task('sass', function() {
  return gulp.src('app/scss/style.scss')
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('useref', function () {
  return gulp.src('app/*.html')
  .pipe(useref())
  .pipe(gulpIf('*.js', uglify()))
  .pipe(gulpIf('*.css', cleanCSS({compatibility: 'ie8'})))
  .pipe(gulp.dest('dist'))
});


gulp.task('fonts', function () {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('fontawesome', function () {
  return gulp.src('app/fontawesome/**/*')
  .pipe(gulp.dest('dist/fontawesome'))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server : {
      baseDir: 'app'  
    },
  })
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('watch', ['browserSync', 'sass'],function () {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('build', function(callback) {
  runSequence('clean:dist', ['sass', 'useref', 'images', 'fonts', 'fontawesome'], callback);
});

gulp.task('start', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
    )
});

gulp.task('default', function (callback) {
  runSequence(['clean:dist', 'build'],
    callback
    )
});

// Optimizing Images 
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'))
});
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

gulp.task('scss', function() {
    gulp.src('./**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename(function(filename) {
            filename.extname = '.wxss';
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
    gulp.watch('./page/**/*', ['scss']);
    gulp.watch('./*.scss', ['scss']);
});

gulp.task('default', ['watch'], function() {
    console.log('done!');
});
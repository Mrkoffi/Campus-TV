var gulp = require('gulp'), connect = require('gulp-connect');

gulp.task('webserver', function () {
    connect.server({
        port: 80,
        livereload: true
    });
});

gulp.task('default', ['webserver']);
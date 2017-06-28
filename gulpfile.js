var gulp = require('gulp');

// fileinclude
var fileinclude = require('gulp-file-include');
gulp.task('fileinclude', function() {
    gulp.src('dev/**/**.html')
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
    .pipe(gulp.dest('dist'));
});

// less编译+生成sourcemaps
var less = require('gulp-less');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
gulp.task('less', function () {
    return gulp.src('./dev/less/**/*.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/css'));
});

// browserSync
var browserSync = require('browser-sync').create();
// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        files: "**",
        server: {
            baseDir: "./dist"
        }
    });
});

// Static Server + watching files
gulp.task('zhj-dev', function() {

    // browserSync.init({
    //     files: "**",
    //     server: "./dist"
    // });

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("dev/**/**.html", ['fileinclude']);
    gulp.watch("dev/**/**.less", ['less']);
    gulp.watch("dist/**/**.html").on('change', browserSync.reload);
    gulp.watch("dist/**/**.css").on('change', browserSync.reload);
    gulp.watch("dist/**/**.js").on('change', browserSync.reload);
    gulp.watch("dist/**/**.jpg").on('change', browserSync.reload);
    gulp.watch("dist/**/**.png").on('change', browserSync.reload);
    gulp.watch("dist/**/**.gif").on('change', browserSync.reload);
});

gulp.task('default', ['zhj-dev']);

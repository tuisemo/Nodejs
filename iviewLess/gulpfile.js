// 引入 gulp
const gulp = require('gulp');

// 引入组件
const less = require('gulp-less');
const cssmin = require('gulp-clean-css');
const cache = require("gulp-cache");
const ext_replace = require('gulp-ext-replace');


// 编译Less
gulp.task('less', function() {
    return gulp.src('./style.less')
        .pipe(less())
        .pipe(gulp.dest('./css'));
});
//补全前缀+压缩css
gulp.task('cssmin', ['less'], function() {
    gulp.src(['./css/*.css','!./css/*.min.css'])
        .pipe(cache(cssmin()))
        .pipe(ext_replace('.min.css'))
        .pipe(gulp.dest('./css'));
});


// 默认任务
gulp.task('default', ['less', 'cssmin'], function() {
    //gulp.run('cssmin', 'jshint', 'scripts', 'fileinclude', 'imagemin');
});
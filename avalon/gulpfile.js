// 引入 gulp
const gulp = require('gulp');

// 引入组件
const jshint = require('gulp-jshint');
const htmlhint = require('gulp-htmlhint');
const less = require('gulp-less');
const concat = require('gulp-concat');
const jsmin = require('gulp-uglify');
const cssmin = require('gulp-clean-css');
const rename = require('gulp-rename');
const fileinclude = require('gulp-file-include');
const inject = require('gulp-inject'); //html中插入js/css
const htmlminify = require("gulp-html-minify");
const watch = require("gulp-watch");
const cache = require("gulp-cache");
const ext_replace = require('gulp-ext-replace');


// 检查脚本
gulp.task('jshint', function() {
    gulp.src('./bulid/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
//检查html
gulp.task('htmlhint', function() {
    gulp.src(['./bulid/*.html'])
        .pipe(htmlhint())
        .pipe(htmlhint.reporter());
});
// 编译Less
gulp.task('less', function() {
    var lessFun = gulp.src(['./bulid/css/less/*.less','!./bulid/css/less/variables.less'])
        .pipe(less())
        .pipe(gulp.dest('./bulid/css'));
    return lessFun;
});
//补全前缀+压缩css
gulp.task('cssmin', ['less'], function() {
    var cssFun = gulp.src(['./bulid/css/*.css'])
        .pipe(cache(cssmin()))
        .pipe(gulp.dest('./public/css'));
    return cssFun;
});
//include公共文件
gulp.task('fileinclude', ['cssmin'], function() {
    gulp.src('./bulid/*.html')
        .pipe(fileinclude({
            prefix: '<!--module@',
            suffix: '-->',
            basepath: '@file',
            indent: true
        }))
        .pipe(inject(gulp.src(['./bulid/css/UI.css','./bulid/css/style.css', './bulid/css/layer.css'], { reda: false }), { starttag: '<!-- inject:base:{{ext}} -->', relative: true }))
        //.pipe(inject(gulp.src(['./bulid/js/lib/require.js'], { reda: false }), { starttag: '<!-- inject:require:{{ext}} -->', relative: true }))
        .pipe(fileinclude({
            prefix: '<!--IEhack@',
            suffix: '-->',
            basepath: '@file',
            indent: true
        }))
        .pipe(gulp.dest('views'));
});

//压缩简化html
gulp.task('htmlminify', function() {
    gulp.src('./bulid/*.html')
        .pipe(htmlminify())
        .pipe(gulp.dest('public'));
});
//压缩图片文件
gulp.task('imagemin', function() {
    gulp.src('./bulid/images/*')
        .pipe(watch('./images/*'))
        .pipe(gulp.dest('public/images'));
});

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src(['./bulid/js/*.js'])
        //.pipe(jsmin())
        .pipe(gulp.dest('./public/js'));
    gulp.src(['./bulid/js/lib/*.js'])
        .pipe(gulp.dest('./public/js/lib'));
});

// 默认任务
gulp.task('default', ['htmlhint', 'cssmin', 'jshint', 'scripts', 'fileinclude'], function() {

    // 监听文件变化
    gulp.watch('./bulid/js/*.js', ['jshint', 'scripts']);
    gulp.watch('./bulid/css/less/*.less', ['less']);
    gulp.watch('./bulid/css/*.css', ['cssmin']);
    gulp.watch(['./bulid/*.html'], ['fileinclude']);
    gulp.watch(['./bulid/include/*.html'], ['fileinclude', 'htmlminify']);
});
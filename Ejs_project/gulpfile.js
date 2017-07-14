// 引入 gulp
const gulp = require('gulp');

// 引入组件
const header = require('gulp-header');
const jshint = require('gulp-jshint');
const htmlhint = require('gulp-htmlhint');
const less = require('gulp-less');
const concat = require('gulp-concat');
const jsmin = require('gulp-uglify');
const rename = require('gulp-rename');
const watch = require("gulp-watch");
const cache = require("gulp-cache");
const autoprefixer = require("gulp-autoprefixer");

var banner =
    "/** \n\
* By 慎独\n\
*项目练习\n \
*/\n";

// 检查脚本
gulp.task('jshint', function() {
    gulp.src('./bulid/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
//检查html
gulp.task('htmlhint', function() {
    gulp.src('./bulid/*.html')
        .pipe(htmlhint())
        .pipe(htmlhint.reporter());
});
// 编译Less
gulp.task('less', function() {
    gulp.src('./bulid/css/less/*.less')
        .pipe(cache(less()))
        .pipe(gulp.dest('./bulid/css'));
});
//补全前缀+压缩css
gulp.task('cssmin', function() {
    gulp.src(['./bulid/css/*.css'])
        .pipe(autoprefixer({
            browsers: ['last 4 versions']
                //cascade: true, //是否美化属性值 默认：true 像这样：
                //remove: true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(cache(cssmin()))
        .pipe(gulp.dest('./public/css'));
});
//include公共文件
gulp.task('fileinclude', /* ['less', 'cssmin', 'scripts'],*/ function() {
    gulp.src('./bulid/*.html')
        .pipe(inject(gulp.src(['./bulid/js/lib/CommonJS.js'], { reda: false }), { starttag: '<!-- inject:require:{{ext}} -->', relative: true }))
        .pipe(fileinclude({
            prefix: '<!--IEhack@',
            suffix: '-->',
            basepath: '@file',
            indent: true
        }))
        .pipe(gulp.dest('public'));
});

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src(['./bulid/js/*.js'])
        .pipe(jsmin())
        .pipe(gulp.dest('./public/js'));
});

// 文件迁移
gulp.task('copy', function() {
    gulp.src(['./bulid/js/lib/*.js'])
        .pipe(gulp.dest('./public/js/lib'));
});

// 默认任务
gulp.task('default', ['jshint', 'cssmin', 'scripts', 'fileinclude'], function() {
    // 监听文件变化
    gulp.watch('./bulid/js/*.js', ['jshint', 'scripts']);
    gulp.watch('./bulid/css/less/*.less', ['less']);
    gulp.watch('./bulid/css/*.css', ['cssmin']);
    gulp.watch(['./bulid/*.html'], ['htmlhint', 'fileinclude']);
});

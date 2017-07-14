// 引入 gulp
const gulp = require('gulp');

// 引入组件
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
* vue项目练习\n \
*/\n";

// 检查脚本
gulp.task('jshint', function() {
    gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
//检查html
gulp.task('htmlhint', function() {
    gulp.src('./src/*.html')
        .pipe(htmlhint())
        .pipe(htmlhint.reporter());
});
// 编译Less
gulp.task('less', function() {
    gulp.src('./src/css/Style.less')
        .pipe(cache(less()))
        .pipe(gulp.dest('./src/css'));
});
//补全前缀+压缩css
gulp.task('cssmin', function() {
    gulp.src(['./src/css/normalize.css', './src/css/layer.css', './src/css/unslider.css','./src/css/webuploader.css'])
        .pipe(cache(cssmin()))
        .pipe(gulp.dest('./dist/css'));
    gulp.src(['./src/css/bootstrapStyle.css', './src/css/Style.css'])
        .pipe(autoprefixer({
            browsers: ['last 4 versions']
                //cascade: true, //是否美化属性值 默认：true 像这样：
                //remove: true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(cache(cssmin()))
        .pipe(concat('PassportStyle.css'))
        .pipe(gulp.dest('./src/css'))
        .pipe(gulp.dest('./dist/css'));
});
//include公共文件
gulp.task('fileinclude', /* ['less', 'cssmin', 'scripts'],*/ function() {
    gulp.src('./src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true
        }))
        .pipe(inject(gulp.src(['./src/css/normalize.css', './src/css/PassportStyle.css'], { reda: false }), { starttag: '<!-- inject:base:{{ext}} -->', relative: true }))
        //.pipe(inject(gulp.src(['./src/js/MSG.js', './src/js/lib/jquery.js'], { reda: false }), { starttag: '<!-- inject:base:{{ext}} -->', relative: true }))
        //.pipe(inject(gulp.src(['./src/js/lib/vue.js'], { reda: false }), { starttag: '<!-- inject:vue:{{ext}} -->', relative: true }))
        .pipe(inject(gulp.src(['./src/js/lib/require.js'], { reda: false }), { starttag: '<!-- inject:require:{{ext}} -->', relative: true }))
        .pipe(fileinclude({
            prefix: '<!--IEhack@',
            suffix: '-->',
            basepath: '@file',
            indent: true
        }))
        .pipe(htmlbeautify())
        .pipe(gulp.dest('dist'));
});

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src(['./src/js/*.js'])
        //.pipe(jsmin())
        .pipe(gulp.dest('./dist/js'));
    /*gulp.src(['./src/js/lib/lodash.js'])
        .pipe(jsmin())
        .pipe(gulp.dest('./dist/js/lib'));*/
    gulp.src(['./src/js/lib/*.js', './src/js/lib/WebUploader.js']) //库文件不再压缩
        //.pipe(jsmin())
        .pipe(gulp.dest('./dist/js/lib'));
});

// 默认任务
gulp.task('default', ['cssmin', 'jshint', 'scripts', 'fileinclude', 'imagemin'], function() {
    //gulp.run('cssmin', 'jshint', 'scripts', 'fileinclude', 'imagemin');

    // 监听文件变化
    gulp.watch('./src/js/*.js', ['jshint', 'scripts']);
    gulp.watch('./src/css/*.less', ['less']);
    gulp.watch('./src/css/*.css', ['cssmin']);
    gulp.watch(['./src/*.html'], ['fileinclude']);
    gulp.watch(['./src/include/*.html'], ['fileinclude','htmlminify', 'htmlbeautify']);
});

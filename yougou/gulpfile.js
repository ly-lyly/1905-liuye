const gulp = require('gulp');
const watch = require('gulp-watch');
const minihtml = require('gulp-minify-html');
const minicss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const es2015 = require('babel-preset-es2015');

//压缩html
gulp.task('uglifyhtml', () => {
    return gulp.src('src/*.html') //引入文件
        .pipe(minihtml()) //执行压缩插件
        .pipe(gulp.dest('dist/')); //输出
});


//压缩css文件
gulp.task('uglifycss', () => {
    return gulp.src('src/css/*.css') //引入文件
        .pipe(minicss()) //执行压缩插件
        .pipe(gulp.dest('dist/css')); //输出
});


//压缩图片
gulp.task('uglifyimage', () => {
    return gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/img'));
});


//es6转es5并压缩
//gulp-babel gulp-core  babel-preset-es2015
gulp.task('babeljs', () => {
    return gulp.src('src/script/*.js') //引入文件
        .pipe(babel({
            presets: ['es2015']
        })) //执行压缩插件
        .pipe(uglify())
        .pipe(gulp.dest('dist/script')); //输出
});





gulp.task('default', function() { //default:默认名称，编译时可以省略
    watch(['src/*.html', 'src/css/*.css', 'src/script/*.js', 'src/img/*.{png,jpg,gif,ico}'], gulp.parallel('uglifyhtml', 'uglifycss', 'babeljs', 'uglifyimage'));
});
let gulp = require('gulp');
let concat = require('gulp-concat');
let cssnano = require('gulp-cssnano');
let htmlmin = require('gulp-htmlmin');
let imagemin = require('gulp-imagemin');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let uglify = require('gulp-uglify');
let babel = require('gulp-babel');
let autoprefixer = require("gulp-autoprefixer");

// libs文件夹的批量转存
function copyLibsFn(){
    return gulp.src("./src/libs/**/*")
        .pipe(gulp.dest("./dist/libs"))
}
module.exports.copyLibs = copyLibsFn;

// 处理js的指令：ES6编译ES5，压缩
function jsFn(){
    return gulp.src("./src/js/**/*")
        .pipe(babel({
            presets:["@babel/env"]
        }))
        .pipe(uglify())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest("./dist/js"))
}
module.exports.js = jsFn;

// 处理html的指令：压缩
function htmlFn(){
    return gulp.src("./src/pages/**/*")
        .pipe(htmlmin({
            removeEmptyAttributes:true,
            collapseWhitespace:true
        }))
        .pipe(gulp.dest("./dist/pages"))
}
module.exports.html = htmlFn;

// 处理sass文件，编译为css文件
function sassFn(){
    return gulp.src("./src/sass/**/*")
        .pipe(sass())
        .pipe(autoprefixer("last 2 version","safari 5","ie 8","ie 9","opera 12.1","ios 6","android 4"))
        .pipe(cssnano())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest("./dist/css"))
}
module.exports.sass = sassFn;

// 删除文件
// function cleanFn(){
//     return gulp.src("./dest")
//         .pipe(clean())
// }
// module.exports.clean = cleanFn;

// 转存首页功能
function indexFn(){
    return gulp.src("./src/index.html")
        .pipe(htmlmin({
            removeEmptyAttributes:true,
            collapseWhitespace:true
        }))
        .pipe(gulp.dest("./dist/"))
}
module.exports.index = indexFn;

//处理img文件，对图片进行压缩
function imgFn(){
    return gulp.src("./src/img/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/img"))
}
exports.img = imgFn;

//处理矢量图标
function fontFn(){
    return gulp.src("./src/font/*")
        .pipe(gulp.dest("./dist/font"))
}
exports.font = fontFn;

// 暴露批量执行指令
module.exports.most = gulp.parallel(htmlFn,jsFn,indexFn,copyLibsFn,sassFn,imgFn);

// 监听所有文件
function watchAllFn(end){
    gulp.watch("./src/index.html",indexFn);
    gulp.watch("./src/js/**/*",jsFn);
    gulp.watch("./src/pages/**/*",htmlFn);
    gulp.watch("./src/sass/**/*",sassFn);
    gulp.watch("./src/libs/**/*",copyLibsFn);
    gulp.watch("./src/img/*",imgFn);
    gulp.watch("./src/font/*",fontFn);
    end();
}
module.exports.watchAll = watchAllFn;

module.exports.all = gulp.series(gulp.parallel(htmlFn,jsFn,indexFn,copyLibsFn,imgFn,sassFn),gulp.parallel(watchAllFn));
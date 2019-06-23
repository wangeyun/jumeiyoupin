const gulp = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const cleanCss = require("gulp-clean-css");
const babel = require("gulp-babel");

//复制文件 html
gulp.task("copyHtml",function(){
	gulp.src("*.html").pipe(gulp.dest("dist")).pipe(connect.reload());
;
});
//复制文件 js
gulp.task("copyJs",function(){
    gulp.src("js/**").pipe(gulp.dest("dist/js"));
});
//复制文件 img
gulp.task("copyImg",function(){
	gulp.src("imgs/**").pipe(gulp.dest("dist/imgs"));
});
//复制文件 数据json，xml
gulp.task("copyData",function(){
	gulp.src(["xml/*.xml","json/*.json"]).pipe(gulp.dest("dist/data"));
});
//sass转css
gulp.task("sass",function(){
	gulp.src("sass/*.scss")
	.pipe(sourcemaps.init())
	.pipe(sass({"outputStyle":"compact"}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css"));
});
// 文件合并concat
gulp.task("concat",function(){
	gulp.src(["js/*.js"])
	.pipe(concat("main.js"))
	.pipe(gulp.dest("dist/js"))
	.pipe(uglify())
	.pipe(rename("main.min.js"))
	.pipe(gulp.dest("dist/js"));
});
//压缩js文件 uglity
gulp.task("uglify",function(){
	gulp.src("js/*.js")
	.pipe(gulp.dest("dist/js"))
	.pipe(uglify())
	.pipe(rename({suffix: ".min"}))
	.pipe(gulp.dest("dist/js"));
});
//压缩css 
gulp.task("cleanCss",function(){
	gulp.src("css/*.css")
	.pipe(cleanCss())
	.pipe(gulp.dest("dist/css"));
});
//js6转js5
gulp.task("babel",function(){
	gulp.src("js/es6.js")
	.pipe(babel({"presets":["es2015"]}))
	.pipe(gulp.dest("dist/js"));
})
//实时监听
gulp.task("watch",function(){
	gulp.watch("*.html",["copyHtml"]);
	gulp.watch("imgs/**",["copyImg"]);
	gulp.watch(["xml/*.xml","json/*.json"],["copyData"]);
	gulp.watch("sass/*.scss",["sass"]);
	gulp.watch("js/*.js",["copyJs"]);
});
//创建服务器
gulp.task("server",function(){
	connect.server({
		root:"dist",
		livereload:true 
	})
})

//建造 build
gulp.task("build",["copyHtml","copyImg","copyData","copyJs","babel","sass","uglify"]);
//默认程序 dafault
gulp.task("default",["server","watch"]);
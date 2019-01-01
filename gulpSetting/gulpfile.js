var fileinclude = require("gulp-file-include"),
	sass = require("gulp-sass"),
	connect = require("gulp-connect"),
	webserver = require("gulp-webserver"),
	gulp = require("gulp");

// html include
gulp.task("fileinclude", function(){
	return gulp.src(["./app/src/index.html", "./app/src/sub/*.html"], {base : "./"})
	.pipe(fileinclude({
		prefix: "@@",
		basepath: "@file"
	}))
	.pipe(gulp.dest("./"));
});

// sass
gulp.task("sass", function(){
	return gulp.src("./app/scssfile/*.scss")
	.pipe(sass({outputStyle : "compact"}).on("error", sass.logError))
	.pipe(gulp.dest("./app/src/css"));
});

// sass --watch
gulp.task("sass:watch", function(){
	gulp.watch("./app/scssfile/*.scss", gulp.series("sass"));
});

// gulp 서버
gulp.task("connect", function(){
	connect.server({
		root: "./app/src",
		livereload: true,
		port: 8001
	});
});

gulp.task("html", function(){
	return gulp.src("./app/src/*.html")
	.pipe(connect.reload());
});

gulp.task("watch", function(){
	gulp.watch("./app/src/*.html", gulp.series("html")); //html reload
	gulp.watch("./app/scssfile/*.scss", gulp.series("sass")); // sass 자동 컴파일
});

gulp.task("live", gulp.series("connect", "watch", function(done){
	done();
}));

// gulp-webserver // 서버 2
gulp.task("webserver", function(){
	return gulp.src("./app/src")
	.pipe(webserver({
		livereload:true,
		open:true,
		port:8888
	}));
});

gulp.task("live2", gulp.series("webserver"))
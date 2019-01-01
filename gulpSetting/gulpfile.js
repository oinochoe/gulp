var fileinclude = require('gulp-file-include'),
	sass = require("gulp-sass"),
	gulp = require('gulp');

// html include
gulp.task('fileinclude', function(){
	return gulp.src(['./app/src/index.html', './app/src/sub/*.html'], {base : './'})
	.pipe(fileinclude({
		prefix: '@@',
		basepath: '@file'
	}))
	.pipe(gulp.dest('./'));
});

// sass
gulp.task('sass', function(){
	return gulp.src('./app/scssfile/*.scss')
	.pipe(sass({outputStyle : 'compact'}).on('error', sass.logError))
	.pipe(gulp.dest('./app/src/css'));
});

// sass --watch
gulp.task('sass:watch', function(){
	gulp.watch('./app/scssfile/*.scss', gulp.series('sass'));
});
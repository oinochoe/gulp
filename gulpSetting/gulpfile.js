var fileinclude = require('gulp-file-include'),
	gulp = require('gulp');

gulp.task('fileinclude', function(){
	return gulp.src('package.json') 
	gulp.src(['./app/src/index.html', './app/src/sub/*.html'], {base : './'})
	.pipe(fileinclude({
		prefix: '@@',
		basepath: '@file'
	}))
	.pipe(gulp.dest('./'));
});
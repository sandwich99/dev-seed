var gulp = require('gulp'),
	path = require('path'),
	compass = require('gulp-compass'),
    minifyCSS = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect');


var paths = {
	sass: 'assets/sass/**/*.scss',
	image: 'assets/sass/**/*',
	css: 'assets/css/**/*.css',
	html: 'assets/**/*.html'
}


gulp.task('compass', function() {


    gulp.src(paths.sass)
    	.pipe(plumber())
        .pipe(compass({
            css: 'assets/css',
            sass: 'assets/sass',
            image: 'assets/images',
            require: ['susy']
        }))
        .pipe(connect.reload());
});


gulp.task('connect', connect.server({
  root: ['assets'],
  port: 1337,
  livereload:{
    port: 35729
  },
  open: {
    file: 'index.html',
    browser: 'google-chrome'
  }
}));


gulp.task('reload', function () {
  gulp.src([paths.html])
    .pipe(connect.reload());
});


gulp.task('watch',function() {

	gulp.watch([paths.sass,paths.image],['compass']);

	gulp.watch([paths.html,paths.css],['reload']);

})


gulp.task('dist',function() {

	gulp.src(paths.css)
			.pipe(minifyCSS())
			.pipe(gulp.dest('dist/temp'));



})


gulp.task('default',['connect','compass','watch']);
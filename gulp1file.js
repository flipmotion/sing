var gulp = require('gulp'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify'),
	reload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
	concat = require('gulp-concat');
	imagemin = require('gulp-imagemin');
	pngquant = require('imagemin-pngquant');
	babel = require('gulp-babel');
	watch = require('gulp-watch');
//less
gulp.task('styles', function() {
	return gulp.src('build/less/app.less')
	.pipe(less())
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(rename({
	  suffix: '.min'
	}))
	.pipe(minifycss())
	.pipe(gulp.dest('assets/css'))
	.pipe(connect.reload())
	.pipe(notify({
		message: 'css!'
	}));
});
gulp.task('img', function () {
    return gulp.src('build/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('assets/img'))
        .pipe(connect.reload())
		.pipe(notify({
			message: 'img`s!'
		}));
});
//server
gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});
//html
gulp.task('html', function () {
	gulp.src('*.html')
	.pipe(connect.reload())
	.pipe(notify({
		message: 'html!'
	}));
});
//js
gulp.task('scripts', function() {
	return gulp.src('build/js/my/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('app.js'))
		.pipe(gulp.dest('assets/js'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('assets/js'))
		.pipe(connect.reload())
		.pipe(notify({ message: 'app.js' }));
});

//watcher
gulp.task('watch', function () {
	gulp.watch(['*.html'], ['html']);
	gulp.watch(['build/js/my/*.js'], ['scripts']);
	gulp.watch(['build/less/*.less'], ['styles']);
	gulp.watch(['build/img/*'], ['img']);
});
 
gulp.task('default', ['connect', 'watch']);




var gulp        = require('gulp'),
		del         = require('del'),
		browserSync = require('browser-sync').create(),
		concat      = require('gulp-concat'),
		imagemin    = require('gulp-imagemin'),
		jshint      = require('gulp-jshint'),
		stylish     = require('jshint-stylish'),
		plumber     = require('gulp-plumber'),
		sass        = require('gulp-sass'),
		sourcemaps  = require('gulp-sourcemaps'),
		uglify      = require('gulp-uglify');


//directorios origen
var srcPaths = {
	images:   'src/img/',
	scripts:  'src/js/',
	styles:   'src/sass/',
	files:    'src/'
};


//directorios destino
var distPaths = {
	images:   'dist/img/',
	scripts:  'dist/js/',
	styles:   'dist/css/',
	files:    'dist/'
};

//limpieza de dist
gulp.task('clean', function(cb) {
	del([ distPaths.files+'*.html', distPaths.scripts+'main.min.js', distPaths.styles+'style.css'], cb);
});


//copia de html en dist.
gulp.task('html', function() {
	return gulp.src([srcPaths.files+'*.html'])
			.pipe(gulp.dest(distPaths.files))
			.pipe(browserSync.stream());
});


//procesamiento de SCSS
gulp.task('css', function() {
	return gulp.src([srcPaths.styles+'**/*.scss'])
			.pipe(sourcemaps.init())
			.pipe(sass())
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(distPaths.styles))
			.pipe(browserSync.stream());
});

//procesamiento de JS (errores)
gulp.task('lint', function() {
	return gulp.src([srcPaths.scripts+'**/*.js'])
			.pipe(jshint())
			.pipe(jshint.reporter(stylish));
});


//creacion de JS minificado
gulp.task('js', ['lint'], function() {
	return gulp.src([srcPaths.scripts+'main.js', srcPaths.scripts+'extra.js'])
			.pipe(sourcemaps.init())
			.pipe(concat('main.min.js'))
			.pipe(uglify())
			.pipe(sourcemaps.write('maps'))
			.pipe(gulp.dest(distPaths.scripts))
			.pipe(browserSync.stream());
});



gulp.task('serve', ['html', 'css', 'js'], function() {
	browserSync.init({
		logLevel: "info",
		browser: ["google chrome"],
		proxy: "localhost:80",
		startPath: "/projects/currency-converter/dist/"
	});

	gulp.watch(srcPaths.files+'*.html', ['html']);
	gulp.watch(srcPaths.styles+'**/*.scss', ['css']);
	gulp.watch(srcPaths.scripts+'**/*.js', ['js']);
});


gulp.task('default', ['clean', 'serve'], function() {});
var gulp = require('gulp');
var babel = require('gulp-babel');
var watch = require('gulp-watch');
// var  rollup   = require('gulp-rollup');
gulp.task('default', function() {
    //gulp.src
    gulp.src('src/**/*.js')
    .pipe(babel({
    	babelrc: false,
        plugins: ["transform-es2015-modules-commonjs"]
    }))
    .pipe(gulp.dest('./build'));
});

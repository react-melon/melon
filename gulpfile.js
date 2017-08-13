/**
 * @file gulpfile
 * @author leon <ludafa@outlook.com>
 */

const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const babelHelpers = require('gulp-babel-external-helpers');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const nib = require('nib');
const path = require('path');

gulp.task('babel', function () {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(babelHelpers('babelHelpers.js', 'umd'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('lib'));
});

gulp.task('stylus', function () {
    return gulp.src('src/**/*.styl').pipe(gulp.dest('lib'));
});

gulp.task('css', function () {
    return gulp
        .src([
            'src/**/*.styl',
            '!src/css/theme/**/*.styl',
            '!src/css/variables.styl',
            '!src/css/base.styl',
            '!src/css/minxi.styl',
            '!src/css/colors.styl'
        ])
        .pipe(stylus({
            'compress': true,
            'include css': true,
            'resolve url': true,
            'paths': ['node_modules'],
            'use': [nib()],
            'import': [
                path.join(__dirname, './src/css/theme/default/index.styl')
            ]
        }))
        .pipe(gulp.dest('lib'));
});

gulp.task('font', function () {
    return gulp.src('src/font/*').pipe(gulp.dest('lib/font'));
});

gulp.task('pkg', function () {
    return gulp.src([
        'package.json',
        'readme.md'
    ]).pipe(gulp.dest('lib'));
});

gulp.task('build', ['babel', 'stylus', 'font', 'pkg', 'css']);

gulp.task('clean', function () {
    return gulp
        .src('dist', {read: false})
        .pipe(clean());
});

gulp.task('rebuild', ['clean', 'build']);

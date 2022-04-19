import gulp from "gulp"
import uglifycss from "gulp-uglifycss"
import concat from "gulp-concat"
import uglifyjs from "gulp-uglify"
import imagemin from "gulp-imagemin"
import connect from "gulp-connect"
import htmlmin from "gulp-htmlmin"
import sourcemaps from "gulp-sourcemaps"
import tempSass from "sass"
import gulpSass from "gulp-sass"
import fileinclude from "gulp-file-include"

const sass = gulpSass(tempSass)

function html() {
    return gulp.src("src/html/*.html")
        .pipe(sourcemaps.init())
        .pipe(fileinclude())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("build"))
        .pipe(connect.reload())
}

//BUILD HTML
function buildHtml() {
    return gulp.src("src/html/*.html")
        .pipe(fileinclude())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("build"))
}

function css() {
    return gulp.src("src/css/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(uglifycss())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("build/styles"))
        .pipe(connect.reload())
}

//BUILD CSS
function buildCss() {
    return gulp.src("src/css/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(uglifycss())
        .pipe(gulp.dest("build/styles"))
}

function js() {
    return gulp.src("src/js/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("app.js"))
        .pipe(uglifyjs())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("build/js"))
        .pipe(connect.reload())
}

//BUILD JS
function buildJs() {
    return gulp.src("src/js/*.js")
        .pipe(concat("app.js"))
        .pipe(uglifyjs())
        .pipe(gulp.dest("build/js"))
}

function images() {
    return gulp.src("src/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("build/images"))
        .pipe(connect.reload())
}

//BUILD IMAGES
function buildImages() {
    return gulp.src("src/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("build/images"))
}

function watchCss() {
    gulp.watch("src/css/**/*.scss", { events: "all", ignoreInitial: false }, async function () {
        css()
    })
}

function watchJs() {
    gulp.watch("src/js/**/*.js", { events: "all", ignoreInitial: false }, async function () {
        js()
    })
}

function watchHtml() {
    gulp.watch("src/html/**/*.html", { events: "all", ignoreInitial: false }, function (cb) {
        html()
        cb()
    })
}

function server() {
    connect.server({
        root: "build",
        livereload: true
    })
}

export const watcher = gulp.parallel(watchHtml, watchCss, watchJs)
export { css, js, images, html }
export default gulp.parallel(watcher, server)

//the build export, used på netlify therefore we output to build folder
export const build = gulp.parallel(buildHtml, buildCss, buildJs, buildImages)
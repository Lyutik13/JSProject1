"use strict";
const { src, dest, watch, parallel } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
// concat - для конкатенации(объединение) файлов и rename
const concat = require("gulp-concat");
// uglify - для сжимания js
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const htmlmin = require("gulp-htmlmin");
const cleanCSS = require("gulp-clean-css");
const webpack = require("webpack-stream");

function styles() {
    return src("./src/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(scss({ outputStyle: "compressed" }))
        .pipe(cleanCSS({ compatibility: "ie10" }))
        .pipe(
            autoprefixer(["> 0.5%", "last 1 versions", "not dead"], {
                cascade: false,
            })
        )
        .pipe(concat("style.min.css"))
        .pipe(sourcemaps.write("./"))
        .pipe(dest("./dist/css"))
        .pipe(browserSync.stream());
}

function scripts() {
    return (
        src("./src/js/script.js")
            // .pipe(concat("main.min.js"))
            // .pipe(uglify())
            .pipe(webpack(require("./webpack.config.js")))
            .pipe(dest("./dist/js"))
            .pipe(browserSync.stream())
    );
}

function html() {
    return src(["./src/*.html"], { base: "src" })
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest("./dist/"));
}

function watching() {
    browserSync.init({
        server: {
            baseDir: "./dist",
        },
    });

    watch(["./src/*.html"], html).on("change", browserSync.reload);
    watch(["./src/scss/**/*.scss"], styles);
    watch(["./src/js/**/*.js"], scripts);
}

exports.default = parallel(watching, html, styles, scripts);

//  General
const { src, dest, watch, series, parallel } = require("gulp");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");

// Styles
const sass = require("gulp-sass")(require("sass"));

// BrowserSync
const del = require("del");
const browsersync = require("browser-sync").create();

const inputPath = "./site";
const outputPath = "./dist";

var onError = function (err) {
    notify.onError({
        title: "Gulp Error - Compile Failed",
        message: "Error: <%= error.message %>",
    })(err);

    this.emit("end");
};

function serve(done) {
    browsersync.init({
        server: outputPath,
        watch: true,
        port: 8080,
        open: false,
        logFileChanges: true,
        // Don't trigger a reload until there have been no changes for at least 500ms
        reloadDebounce: 1000,
        // Don't bother waiting after a file change event to reload the page.  This could potentially prevent a bunch of
        // reloads from occurring sequentially, but in practice it'll probably just slow down the automatic reload from
        // showing the result to the user so just skip it.
        reloadDelay: 0,
        // Don't throttle reloads, after the debounce and delay process as many reloads as are available so they finish
        // as quickly as possible.
        reloadThrottle: 0,
    }, (err) => {
        done(err);
    });
}

function watchFiles() {
    watch("./site/**/*.*", series(build))
}


// Compile shared CSS files and dump it in the specified output path.
function compileCSS() {
    return src("./site/css/*.scss")
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass.sync())
        .pipe(dest("./dist/css"));
};

// Compile shared CSS files and dump it in the specified output path.
function copyStaticCSS() {
    return src("./site/css/*.css")
        .pipe(plumber({ errorHandler: onError }))
        .pipe(dest("./dist/css"));
};

function copyHTML() {
    return src("./site/html/*.*")
        .pipe(plumber({ errorHandler: onError }))
        .pipe(dest("./dist"));
}

function copyAssets() {
    return src("./site/assets/**/*.*")
        .pipe(plumber({ errorHandler: onError }))
        .pipe(dest("./dist/assets"));
}

const build = parallel(
    compileCSS,
    copyStaticCSS,
    copyHTML,
    copyAssets,
);

const serveFiles = parallel(
    serve,
    watchFiles
);

exports.clean = () => {
    return del(
        [
            "./dist/",
            paths.sass.dest,
            paths.javascript.dest
        ]
    );
};

exports.build = build;
exports.dev = series(build, serveFiles);
exports.default = exports.build;


const {src, dest, series, watch } = require(`gulp`);

const browserSync = require(`browser-sync`);
const reload = browserSync.reload;

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 100, // A delay is sometimes helpful when reloading at the
        server: {       // end of a series of tasks.
            baseDir: [
                `dev`,
                `dev/css`,
                `dev/scripts`
            ]
        }
    });

    watch(`dev/**/*.html`,
            series(validateHTML)
        ).on(`change`, reload);

    //watch(`dev/**/*.scss`).on(`change`, reload);
    watch(`dev/css/*.scss`,
            series(compileCSSForDev)
        ).on(`change`, reload);
    watch(`dev/scripts/*.js`
        ,series(transpileJSForDev)
        ).on(`change`, reload);
};

const htmlCompressor = require(`gulp-htmlmin`);

let compressHTML = () => {
    return src(`dev/*.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
}

const jsCompressor = require(`gulp-uglify-es`).default;
const babel = require(`gulp-babel`);

let compressJS = () => {
    return src(`dev/scripts/transpiled/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/scripts`));
};
let transpileJSForDev = () => {
    return src(`dev/scripts/*.js`)
        .pipe(babel())
        .pipe(dest(`dev/scripts/transpiled`));
};

const cache = require(`gulp-cache`);
const imageCompressor = require(`gulp-imagemin`);

let compressImages = () => {
    // Read about the double-star glob pattern at
    // https://gulpjs.com/docs/en/getting-started/explaining-globs#special-character-double-star
    return src([
        `dev/imgs/**/*.png`,
        `dev/imgs/**/*.jpg`,
        `dev/imgs/**/*.svg`,
        `dev/imgs/**/*.gif`
    ])
        .pipe(cache(
            imageCompressor({
                optimizationLevel: 3, // For PNG files. Accepts 0 – 7; 3 is default.
                progressive: true,    // For JPG files.
                multipass: false,     // For SVG files. Set to true for compression.
                interlaced: false     // For GIF files. Set to true for compression.
            })
        ))
        .pipe(dest(`prod/imgs`));
};

const sass = require(`gulp-sass`);

let compileCSSForDev = () => {
    return src([
            `dev/css/main.scss`,
            `dev/css/design.scss`,
            `dev/css/animation.scss`,
            `dev/css/art.scss`])
        .pipe(sass({
            outputStyle: `expanded`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(dest(`dev/css`));
};
let compileCSSForProd = () => {
    return src([`dev/css/main.scss`,
                `dev/css/design.scss`,
                `dev/css/animation.scss`,
                `dev/css/art.scss`])
        .pipe(sass({
            outputStyle: `compressed`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(dest(`prod/css`));
};

const htmlValidator = require(`gulp-html`);

let validateHTML = () => {
    return src(`dev/*.html`)
        .pipe(htmlValidator());
};

exports.serve = serve;
exports.validateHTML = validateHTML;
exports.transpileJSForDev = transpileJSForDev;
exports.compressJS = compressJS;
exports.compressImages = compressImages;
exports.compileCSSForDev = compileCSSForDev;
exports.compileCSSForProd = compileCSSForProd;
exports.default = series(serve, compileCSSForDev, transpileJSForDev, validateHTML);
exports.build = series(compressHTML, compileCSSForProd, compressImages, compressJS);

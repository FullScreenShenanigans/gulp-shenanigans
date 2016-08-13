const htmlmin = require("gulp-htmlmin");
const processHtml = require("gulp-processhtml");
import { Constants, IGulpSettings } from "../../definitions";

/**
 * Process HTML files.
 */
export default function (settings: IGulpSettings) {
    "use strict";

    return settings.gulp.src(`${Constants.folders.src}/*.html`)
        .pipe(processHtml())
        .pipe(htmlmin({
            collapseBooleanAttributes: true,
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true
        }))
        .pipe(settings.gulp.dest(Constants.folders.lib));
}

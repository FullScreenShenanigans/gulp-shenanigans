import { Constants, IGulpSettings } from "../../definitions";

/**
 * Process HTML files.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const htmlmin = require("gulp-htmlmin");
    const processHtml = require("gulp-processhtml");

    return settings.gulp
        .src([
            `${Constants.folders.src}/*.html`,
            `!${Constants.folders.src}/*.template.html`
        ])
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

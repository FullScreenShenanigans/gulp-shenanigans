const htmlmin: any = require("gulp-htmlmin");
const processHtml: any = require("gulp-processhtml");
import { Constants, IGulpSettings } from "../../definitions";

/**
 * Process HTML files.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

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

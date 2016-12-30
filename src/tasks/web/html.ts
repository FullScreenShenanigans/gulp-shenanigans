const change: any = require("gulp-change");
import { Constants, IGulpSettings } from "../../definitions";

/**
 * Removes the RequireJS configuration script from a page.
 * 
 * @param contents   Contents of the page.
 * @returns Page contents with the RequireJS configuration script removed.
 */
function removeRequireRedirects(contents: string): string {
    return [
        contents.substring(0, contents.lastIndexOf("<script")),
        contents.substring(contents.lastIndexOf("/script>") + "/script>".length)
    ].join("");
}

/**
 * Copies resource files to the dist folder.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const sources: string[] = [
        `${Constants.folders.lib}/index.html`
    ];

    return settings.gulp
        .src(sources, {
            base: Constants.folders.lib
        })
        .pipe(change(removeRequireRedirects))
        .pipe(settings.gulp.dest(Constants.folders.dist));
}

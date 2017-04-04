import { Constants, IGulpSettings } from "../../definitions";

/**
 * Minifies the output .css.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const cssMin = require("gulp-clean-css");

    return settings.gulp.src(`${Constants.folders.src}/*.css`)
        .pipe(cssMin({
            compatibility: "ie10"
        }))
        .pipe(settings.gulp.dest(Constants.folders.lib));
}

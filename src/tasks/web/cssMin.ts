const cssMin = require("gulp-clean-css");
import { Constants, IGulpSettings } from "../../definitions";

/**
 * Minifies the output .css.
 */
export default function (settings: IGulpSettings) {
    "use strict";

    return settings.gulp.src(`${Constants.folders.src}/*.css`)
        .pipe(cssMin({
            compatibility: "ie10"
        }))
        .pipe(settings.gulp.dest(Constants.folders.lib));
}

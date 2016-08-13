const scss = require("gulp-sass");
import { Constants, IGulpSettings } from "../../definitions";

/**
 * Compiles source .scss files in-place.
 */
export default function (settings: IGulpSettings) {
    "use strict";

    return settings.gulp.src(`${Constants.folders.src}/*.scss`)
        .pipe(scss().on("error", scss.logError))
        .pipe(settings.gulp.dest(Constants.folders.src));
}

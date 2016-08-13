const processHtml = require("gulp-processhtml");
import { Constants, IGulpSettings } from "../../definitions";

/**
 * Process HTML files.
 */
export default function (settings: IGulpSettings) {
    "use strict";

    return settings.gulp.src(`${Constants.folders.src}/*.html`)
        .pipe(processHtml({
            // ...
        }))
        .pipe(settings.gulp.dest(Constants.folders.lib));
}
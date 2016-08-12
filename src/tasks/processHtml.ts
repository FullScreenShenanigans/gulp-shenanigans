const processHtml = require("gulp-processhtml");
import { Constants, IGulpSettings } from "../main";

/**
 * Process HTML files.
 */
export function taskProcessHtml(settings: IGulpSettings) {
    "use strict";

    return settings.gulp.src(`${Constants.folders.src}/*.html`)
        .pipe(processHtml({
            // ...
        }))
        .pipe(settings.gulp.dest(Constants.folders.lib));
}

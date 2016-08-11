const lint = require("gulp-sass");
import { Constants, IGulpSettings } from "../main";

/**
 * Runs scss-lint on source files.
 */
export function taskScssLint(settings: IGulpSettings) {
    "use strict";

    return settings.gulp.src(`${Constants.folders.src}/*.scss`)
        .pipe(lint());
}

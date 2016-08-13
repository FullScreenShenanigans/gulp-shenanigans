const lint = require("gulp-sass");
import { Constants, IGulpSettings } from "../../definitions";

/**
 * Runs scss-lint on source files.
 */
export default function (settings: IGulpSettings) {
    "use strict";

    return settings.gulp.src(`${Constants.folders.src}/*.scss`)
        .pipe(lint());
}

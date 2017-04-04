import { Constants, IGulpSettings } from "../../definitions";

/**
 * Runs scss-lint on source files.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const lint = require("gulp-sass-lint");

    return settings.gulp.src(`${Constants.folders.src}/*.scss`)
        .pipe(lint());
}

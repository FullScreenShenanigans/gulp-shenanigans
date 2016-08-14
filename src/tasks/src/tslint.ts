const tslint = require("gulp-tslint");
import { IGulpSettings, Constants } from "../../definitions";

/**
 * Runs TSLint on source files.
 */
export default function taskTslint(settings: IGulpSettings) {
    "use strict";

    return settings.gulp.src([`${Constants.folders.src}/**/*.ts`])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
}

const tslint = require("gulp-tslint");
import { IGulpSettings, Constants } from "../main";

/**
 * Runs TSLint on source files.
 */
export function taskTslint(settings: IGulpSettings) {
    "use strict";

    return settings.gulp.src([`${Constants.folders.src}/**/*.ts`])
        .pipe(tslint({
            configuration: "tslint.json",
            formatter: "verbose"
        }))
        .pipe(tslint.report());
}

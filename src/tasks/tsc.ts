const ts = require("gulp-typescript");
import { IGulpSettings, Constants } from "../main";

/**
 * Compiles source .ts files in-place.
 */
export function taskTsc(settings: IGulpSettings) {
    "use strict";

    const project = ts.createProject("tsconfig.json");
    return project
        .src()
        .pipe(ts(project))
        .js
        .pipe(settings.gulp.dest(Constants.folders.src));
}

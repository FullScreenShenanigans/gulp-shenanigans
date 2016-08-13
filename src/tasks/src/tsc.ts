const ts = require("gulp-typescript");
import { IGulpSettings, Constants } from "../../definitions";

/**
 * Compiles source .ts files in-place.
 */
export default function taskTsc(settings: IGulpSettings) {
    "use strict";

    const project = ts.createProject("tsconfig.json");
    return project
        .src()
        .pipe(ts(project))
        .js
        .pipe(settings.gulp.dest(Constants.folders.src));
}

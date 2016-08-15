const ts: any = require("gulp-typescript");
import { Constants, IGulpSettings } from "../../definitions";

/**
 * Compiles source .ts files in-place.
 */
export default function taskTsc(settings: IGulpSettings): any {
    "use strict";

    const project: any = ts.createProject("tsconfig.json");
    return project
        .src()
        .pipe(ts(project))
        .js
        .pipe(settings.gulp.dest(Constants.folders.src));
}

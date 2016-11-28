const ts: any = require("gulp-typescript");
import { Constants, IGulpSettings } from "../../definitions";

/**
 * Compiles source .ts files in-place.
 */
export default function taskTsc(settings: IGulpSettings): any {
    "use strict";

    const project: any = ts.createProject("tsconfig.json");
    const output: any = project
        .src()
        .pipe(project());

    return output.js
        .pipe(settings.gulp.dest(Constants.folders.src));
}

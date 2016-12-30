const ts: any = require("gulp-typescript");
import { Constants, IGulpSettings } from "../../definitions";

/**
 * Compiles test .ts files to .js in-place.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const project: any = ts.createProject(`${Constants.folders.test}/tsconfig.json`);
    const output: any = project
        .src()
        .pipe(project());

    return output.js
        .pipe(settings.gulp.dest("."));
}
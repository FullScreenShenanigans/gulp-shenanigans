import { Constants, IGulpSettings } from "../../definitions";

/**
 * Compiles test .ts files to .js in-place.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const ts = require("gulp-typescript");

    const project: any = ts.createProject(Constants.files.src.tsconfig);
    const output: any = project
        .src()
        .pipe(project());

    return output.js
        .pipe(settings.gulp.dest("."));
}

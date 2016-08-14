const ts = require("gulp-typescript");
import { IGulpSettings, Constants } from "../../definitions";

/**
 * Compiles test .ts files to .js in-place.
 */
export default function (settings: IGulpSettings, callback: Function) {
    "use strict";

    const tsProject = ts.createProject(`${Constants.folders.test}/tsconfig.json`);
    return tsProject
        .src()
        .pipe(ts(tsProject))
        .js
        .pipe(settings.gulp.dest(Constants.folders.test));
}

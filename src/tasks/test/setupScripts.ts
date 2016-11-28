const ts: any = require("gulp-typescript");
import { Constants, IGulpSettings } from "../../definitions";

/**
 * Compiles test .ts files to .js in-place.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const tsProject: any = ts.createProject(`${Constants.folders.test}/tsconfig.json`);
    return tsProject
        .src()
        .pipe(ts(tsProject))
        .js
        .pipe(settings.gulp.dest(Constants.folders.test));
}

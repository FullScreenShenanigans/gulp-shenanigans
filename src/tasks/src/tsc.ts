import { Constants, IGulpSettings } from "../../definitions";

/**
 * Compiles source .ts files in-place.
 */
export default function taskTsc(settings: IGulpSettings): any {
    "use strict";

    const merge = require("merge2");
    const sourcemaps = require("gulp-sourcemaps");
    const ts = require("gulp-typescript");

    const project: any = ts.createProject("tsconfig.json");
    const output: any = project
        .src()
        .pipe(sourcemaps.init())
        .pipe(project());

    return merge([
        output.js
            .pipe(sourcemaps.write())
            .pipe(settings.gulp.dest(Constants.folders.src)),
        output.dts
            .pipe(settings.gulp.dest(Constants.folders.src))
    ]);
}

import { Constants, IGulpSettings } from "../../definitions";

/**
 * Compiles source .ts files to lib/.
 */
export default function taskTsc(settings: IGulpSettings): any {
    "use strict";

    const merge = require("merge2");
    const sourcemaps = require("gulp-sourcemaps");
    const ts = require("gulp-typescript");
    const uglify = require("gulp-uglify");

    const project: any = ts.createProject(Constants.files.src.tsconfig);
    const output: any = project
        .src()
        .pipe(sourcemaps.init())
        .pipe(project());

    return merge([
        output.js
            .pipe(uglify())
            .pipe(sourcemaps.write("."))
            .pipe(settings.gulp.dest(Constants.folders.lib)),
        output.dts
            .pipe(settings.gulp.dest(Constants.folders.lib))
    ]);
}

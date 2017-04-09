import { Constants, IGulpSettings } from "../../definitions";
import { projectFactory } from "../../projectFactory";

/**
 * Compiles source .ts files to lib/.
 */
export default function taskTsc(settings: IGulpSettings): any {
    "use strict";

    const merge = require("merge2");
    const sourcemaps = require("gulp-sourcemaps");
    const uglify = require("gulp-uglify");

    const project: any = projectFactory(Constants.files.src.tsconfig);
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

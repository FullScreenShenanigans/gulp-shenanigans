const rename: any = require("gulp-rename");
import { IGulpSettings } from "../../definitions";

/**
 * Deletes all built files.
 */
export default function taskClean(settings: IGulpSettings): any {
    "use strict";

    return settings.gulp
        .src(
            ["./node_modules/gulp-shenanigans/src/setup/*"],
            {
                dot: true
            })
        .pipe(rename({
            dirname: ""
        }))
        .pipe(settings.gulp.dest("."));
}

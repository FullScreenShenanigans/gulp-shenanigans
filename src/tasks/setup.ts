const rename = require("gulp-rename");
import { IGulpSettings } from "../definitions";

/**
 * Copies root configuration files.
 */
export default function (settings: IGulpSettings, callback: Function) {
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

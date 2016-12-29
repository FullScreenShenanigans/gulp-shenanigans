const mustache: any = require("gulp-mustache");
import { IGulpSettings } from "../../definitions";

/**
 * Copies resource and setup files to the src folder.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const sources: string[] = [
        "./node_modules/gulp-shenanigans/src/setup/default/**/*",
    ];

    if (settings.taskGroups && settings.taskGroups.web) {
        sources.push("./node_modules/gulp-shenanigans/src/setup/web/**/*");
    }

    return settings.gulp
        .src(
            sources,
            {
                dot: true
            })
        .pipe(mustache(settings))
        .pipe(settings.gulp.dest("."));
}

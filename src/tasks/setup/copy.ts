const debug: any = require("gulp-debug");
const mustache: any = require("gulp-mustache");
// const rename: any = require("gulp-rename");
import { IGulpSettings } from "../../definitions";

/**
 * Copies resource and setup files to the src folder.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const sources: string[] = (settings.taskGroups && settings.taskGroups.web)
        ? ["./node_modules/gulp-shenanigans/src/setup/*"]
        : ["./node_modules/gulp-shenanigans/src/setup/**/*"];

    console.log({ sources }, "from", settings);

    return settings.gulp
        .src(
            sources,
            {
                dot: true
            })
        .pipe(debug())
        .pipe(mustache(settings))
        // .pipe(rename({
        //     dirname: ""
        // }))
        .pipe(settings.gulp.dest("."));
}

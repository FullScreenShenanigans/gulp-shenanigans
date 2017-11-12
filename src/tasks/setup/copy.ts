import { IGulpSettings } from "../../definitions";

/**
 * Copies resource and setup files to the src folder.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    const mustache = require("gulp-mustache");

    const sources: string[] = [
        "./node_modules/gulp-shenanigans/src/setup/default/**/*",
    ];
    const buildCommands = ["gulp"];

    if (settings.packageSchema.shenanigans.web) {
        sources.push("./node_modules/gulp-shenanigans/src/setup/web/**/*");
        buildCommands.unshift("gulp setup");
    }

    if (settings.packageSchema.shenanigans.games) {
        sources.push("./node_modules/gulp-shenanigans/src/setup/games/**/*");
    }

    return settings.gulp
        .src(
            sources,
            {
                dot: true
            })
        .pipe(mustache({
            ...settings,
            buildCommands
        }))
        .pipe(settings.gulp.dest("."));
}

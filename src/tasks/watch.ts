import { Constants, IGulpSettings } from "../definitions";

/**
 * Runs the default task whenever a source file changes.
 */
export default function taskWatch(settings: IGulpSettings) {
    "use strict";

    settings.gulp.watch(
        `${Constants.folders.src}/**/*.ts`,
        ["src:tsc"]);

    settings.gulp.watch(
        `${Constants.folders.test}/**/*.ts`,
        [`test`]);

    if (settings.taskGroups.web) {
        settings.gulp.watch(
            [
                `${Constants.folders.src}/*.html`,
                `${Constants.folders.src}/*.scss`
            ],
            ["web"]);
    }
}

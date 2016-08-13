import { IGulpSettings, Constants } from "../../definitions";

/**
 * Copies utility scripts to the destination test folder.
 */
export default function taskTestSetupUtilities(settings: IGulpSettings, callback: Function) {
    "use strict";

    return settings.gulp.src("./node_modules/gulp-shenanigans/src/test/*.?s")
        .pipe(settings.gulp.dest(`${Constants.folders.test}/utils`));
}
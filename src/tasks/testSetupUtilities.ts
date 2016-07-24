import { IGulpSettings, Constants } from "../main";

/**
 * Copies utility scripts to the destination test folder.
 */
export function taskTestSetupUtilities(settings: IGulpSettings, callback: Function) {
    "use strict";

    return settings.gulp.src("./node_modules/gulp-shenanigans/src/test/*.?s")
        .pipe(settings.gulp.dest(`${Constants.folders.test}/utils`));
}

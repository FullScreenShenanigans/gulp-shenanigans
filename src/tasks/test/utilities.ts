import { Constants, IGulpSettings } from "../../definitions";

/**
 * Copies utility scripts to the destination test folder.
 */
export default function (settings: IGulpSettings): any {
    "use strict";

    return settings.gulp
        .src([
            "./node_modules/gulp-shenanigans/src/test/**/*.?s",
            "./node_modules/gulp-shenanigans/src/test/tsconfig.json"
        ])
        .pipe(settings.gulp.dest(`${Constants.folders.test}`));
}

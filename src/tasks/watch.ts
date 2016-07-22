"use strict";

import { IGulpSettings, Constants } from "../main";

/**
 * Runs the default task whenever a source file changes.
 */
export function taskWatch(settings: IGulpSettings) {
    "use strict";

    return settings.gulp.watch(
        [
            `${Constants.folders.src}/**/*.ts`,
            `${Constants.folders.test}/**/*.js`
        ],
        ["default"]);
}

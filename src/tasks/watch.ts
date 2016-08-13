"use strict";

import { Constants, IGulpSettings } from "../definitions";

/**
 * Runs the default task whenever a source file changes.
 */
export default function taskWatch(settings: IGulpSettings) {
    "use strict";

    return settings.gulp.watch(
        [
            `${Constants.folders.src}/**/*.ts`,
            `${Constants.folders.test}/**/*.js`
        ],
        ["default"]);
}

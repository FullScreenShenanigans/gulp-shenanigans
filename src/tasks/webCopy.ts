import { Constants, IGulpSettings } from "../main";

/**
 * Copies .css files to the destination folder.
 */
export function taskWebCopy(settings: IGulpSettings) {
    "use strict";

    return settings.gulp.src(`${Constants.folders.src}/*.css`)
        .pipe(settings.gulp.dest(Constants.folders.lib));
}

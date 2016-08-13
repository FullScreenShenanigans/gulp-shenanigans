import { Constants, IGulpSettings } from "../../definitions";

/**
 * Copies .css files to the destination folder.
 */
export default function (settings: IGulpSettings) {
    "use strict";

    return settings.gulp.src(`${Constants.folders.src}/*.css`)
        .pipe(settings.gulp.dest(Constants.folders.lib));
}

import { Constants, IGulpSettings } from "../main";

/**
 * ???
 */
export function taskWebCopy(settings: IGulpSettings) {
    "use strict";

    return settings.gulp.src(`${Constants.folders.src}/*.css`)
        .pipe(settings.gulp.dest(Constants.folders.lib));
}
